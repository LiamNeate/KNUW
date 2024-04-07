'use server';

import { checkExists } from '@/app/lib/data';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { usePathname } from 'next/navigation'


export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials';
                default:
                    return 'Something went wrong';
            }
        }
        throw error;
    }
}

/*

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce.number().gt(0, {
        message: 'Please enter an amount greater than $0.',
    }),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status.'
    }),
    date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id:true, date:true });

export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing fields. Failed to create invoice.',
        }
    }
    
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    try{
        await sql `
            INSERT INTO invoices (customer_id, amount, status, date)
            VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
        `;
    } catch (error) {
        return{
            message: 'Database Error: Failed to create invoice.',
        };
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

*/

const RatingSchema = z.object({
    id: z.string(),
    rating: z.coerce.number(),
    reccs: z.coerce.number(),
    comment: z.string(),
    userId: z.string(),
    topicId: z.string(),
});

const UpdateRating = RatingSchema.omit({ id: true });

export async function updateRating(formData: FormData){
    const { rating, reccs, comment, userId, topicId } = UpdateRating.parse({
        rating: formData.get('rating'),
        reccs: formData.get('reccs'),
        comment: formData.get('comment'),
        userId: formData.get('userId'),
        topicId: formData.get('topicId')
    });

    const checkingExists = await checkExists(userId, topicId)


    if (checkingExists[0]){
        await sql`
            UPDATE scores 
            SET rating = ${`${rating}`}, recom = ${`${reccs}`}
            WHERE scores.id = ${`${checkingExists[0].scoresid}`};
        `;
        
        await sql`
            UPDATE comments 
            SET comment = ${comment}, likes = 0, dislikes = 0
            WHERE comments.id = ${checkingExists[0].commentsid};
        `;
        
    } else {
        await sql`
            INSERT INTO scores (topic_id, user_id, rating, recom, complete, endorsements)
            VALUES (${topicId}, ${userId}, ${rating}, ${reccs}, true, 0);
        `;
        await sql`
            INSERT INTO comments (comment, topic, user_id, likes, dislikes)
            VALUES (${comment}, ${topicId}, ${userId}, 0, 0);
        `;
    }

    revalidatePath(usePathname.toString());

}

/*
            UPDATE comments 
            SET (comment = ${comment}, likes = 0, dislikes = 0);
            WHERE comments.id = ${checkingExists[0].commentsId};
*/
