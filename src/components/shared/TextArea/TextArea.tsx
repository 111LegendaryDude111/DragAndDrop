import styles from "./styles.module.css";
import React, { FC } from "react";

interface TextArea {
  text: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  id?: string;
}

export const TextArea: FC<TextArea> = ({ text, onChange, id }) => {
  return (
    <textarea
      id={id}
      value={text}
      onChange={onChange}
      placeholder="Write something ..."
      className={styles.textarea}
      autoFocus={true}
    />
  );
};
