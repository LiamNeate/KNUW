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
            INSERT INTO comments (comment, topic_id, user_id, likes, dislikes)
            VALUES (${comment}, ${topicId}, ${userId}, 0, 0);
        `;
    }

    revalidatePath(usePathname.toString());

}

export async function addLike(formData: FormData){
    let likes = parseInt(formData.get('likeAmm')?.toString()!) + 1;
    let dislikes = parseInt(formData.get('dislikeAmm')?.toString()!);
    if (formData.get('likeId')){
        if (formData.get('wasReacted')?.toString() == "true"){
            dislikes = dislikes - 1;
        }

        await sql`
            UPDATE likes 
            SET left_like = true, liked = true
            WHERE likes.id = ${`${formData.get('likeId')}`};
        `;

    } else {
        await sql`
            INSERT INTO likes (comment_id, user_id, left_like, liked)
            VALUES (${`${formData.get('commentId')}`}, ${`${formData.get('userId')}`}, true, true);
        `;
    }

    await sql`
        UPDATE comments 
        SET likes = ${likes}, dislikes = ${dislikes}
        WHERE id = ${`${formData.get('commentId')}`};
    `;

    revalidatePath(usePathname.toString());
}

export async function removeLike(formData: FormData){
    let likes = parseInt(formData.get('likeAmm')?.toString()!) - 1;

    await sql`
        UPDATE likes 
        SET left_like = false, liked = false
        WHERE likes.id = ${`${formData.get('likeId')}`};
    `;

    await sql`
        UPDATE comments 
        SET likes = ${likes}
        WHERE id = ${`${formData.get('commentId')}`};
    `;

    revalidatePath(usePathname.toString());
}

export async function addDislike(formData: FormData){
    let dislikes = parseInt(formData.get('dislikeAmm')?.toString()!) + 1;
    let likes = parseInt(formData.get('likeAmm')?.toString()!);
    if (formData.get('likeId')){
        if (formData.get('wasReacted')?.toString() == "true"){
            likes = likes - 1;
        }

        await sql`
            UPDATE likes 
            SET left_like = true, liked = false
            WHERE likes.id = ${`${formData.get('likeId')}`};
        `;

    } else {
        await sql`
            INSERT INTO likes (comment_id, user_id, left_like, liked)
            VALUES (${`${formData.get('commentId')}`}, ${`${formData.get('userId')}`}, true, false);
        `;
    }

    await sql`
        UPDATE comments 
        SET likes = ${likes}, dislikes = ${dislikes}
        WHERE id = ${`${formData.get('commentId')}`};
    `;

    revalidatePath(usePathname.toString());
}

export async function removeDislike(formData: FormData){

    let dislikes = parseInt(formData.get('dislikeAmm')?.toString()!) - 1;

    await sql`
        UPDATE likes 
        SET left_like = false, liked = false
        WHERE likes.id = ${`${formData.get('likeId')}`};
    `;

    await sql`
        UPDATE comments 
        SET dislikes = ${dislikes}
        WHERE id = ${`${formData.get('commentId')}`};
    `;

    revalidatePath(usePathname.toString());
}