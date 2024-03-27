"use client"
import { AccordionData } from '../types';
import {Accordion, AccordionItem} from "@nextui-org/react";
import styles from './css/Accordion.module.css'

export default function App({ items }: { items: Array<AccordionData> }) {

  return (
    <Accordion variant="splitted">
      {items.map((item, idx) => (
        <AccordionItem
          key={idx}
          title={item.title}
          className={styles.accord}
        >
          {item.content}
          </AccordionItem>
      ))}
 
    </Accordion>
  );
}