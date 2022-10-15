import React, { forwardRef, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ipfsTransformUri } from "utils";
import AddIcon from "assets/icons/add.icon.svg";
import { StyledFormIconInput } from "./styles";

interface FormIconInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  colorable?: boolean;
  label?: string;
}

function FormIconInputComponent({ onChange, colorable = false, label, ...props }: FormIconInputProps, ref) {
  const { t } = useTranslation();
  const [changed, setChanged] = useState(false);
  const localRef = useRef<HTMLInputElement>();

  const name = localRef.current?.name;
  const value = localRef.current?.value;
  const id = `icon-input-${name}`;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChanged(false);
    const fr = new FileReader();

    fr.readAsArrayBuffer(e.target.files![0]);
    fr.onload = function () {
      if (fr.result && localRef.current) {
        const blob = new Blob([fr.result]);
        const url = URL.createObjectURL(blob);
        localRef.current.value = url;

        setChanged(true);
        onChange({
          ...e,
          target: {
            ...localRef.current,
            value: url,
            name: localRef.current.name,
          },
        });
      }
    };
  };

  return (
    <StyledFormIconInput isChanged={changed && colorable}>
      <input
        {...props}
        type="hidden"
        ref={(e) => {
          ref(e);
          (localRef as any).current = e;
        }}
      />

      {label && <label>{label}</label>}
      <input id={id} className="file-input" accept="image/*" type="file" onChange={handleOnChange} />

      {value ? (
        <label htmlFor={id} className="icon-preview">
          <img src={ipfsTransformUri(value)} alt="thumbnail" />
        </label>
      ) : (
        <label htmlFor={id} className="icon-add">
          <img src={AddIcon} alt="add" />
          <p>{t("VaultEditor.img-placeholder")}</p>
        </label>
      )}
    </StyledFormIconInput>
  );
}

export const FormIconInput = forwardRef(FormIconInputComponent);
