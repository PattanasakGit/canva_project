import React, { use, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import Upload from "@/components/Upload";
import { dataInDropdown } from "./dataInDropdown";
import { useGenerateClickStore } from "@/store/generateClickState";
import generateImage from "@/services/generateImage";
import { useCurrentWorkFolderStore } from "@/store/currentWorkFolder";
import { useImangePreviewStore } from "@/store/imagePreviewStoer";
import { useImangeResponseStore } from "@/store/imageResponseStore";
import { useLoadingState } from "@/store/loadingState";

const NewProjectTab = () => {
  const [imageType, setImageType] = useState("");
  const [roomType, setRoomType] = useState("");
  const [style, setStyle] = useState("");
  const [textPrompt, setTextPrompt] = useState("");

  const [removeFurniture, setRemoveFurniture] = useState(false);
  const { generateClickState, setGenerateClickState } = useGenerateClickStore();

  const { previewImage, setPreviewImage, setOriginalFile, onresetData } =
    useImangePreviewStore();

  const {  responseImage, setResponseImage, onResetResponseImageData } = useImangeResponseStore();
  const { cerrentImagePath, setCerrentImagePath } = useCurrentWorkFolderStore();
  const { isLoadingWaitingResponse, setIsLoadingWaitingResponse } = useLoadingState();

  useEffect(() => {
    const handleSubmit = async () => {
      if (cerrentImagePath && cerrentImagePath !== "") {
        const promp = `imageType is ${imageType} and roomType is ${roomType} and style is ${style} => ${textPrompt}`;
        try {
          setIsLoadingWaitingResponse(true);
          const response = await generateImage(cerrentImagePath, promp);
          if (response) {
            // setPreviewImage(response.dirs);
            setResponseImage(response.dirs);
            setIsLoadingWaitingResponse(false);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    handleSubmit();
  }, [cerrentImagePath]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        width: "95%",
      }}
    >
      <Upload />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "8px",
          marginBottom: "-32px",
        }}
      >
        <span style={{ fontSize: "0.9em" }}>Remove Furniture</span>
        <Checkbox
          className="checkbox"
          isSelected={removeFurniture}
          onValueChange={setRemoveFurniture}
          color="warning"
          size="md"
        />
      </div>

      <Select
        variant="faded"
        label="Image Type"
        labelPlacement="outside"
        placeholder=" "
        value={imageType}
        onChange={(e) => setImageType(e.target.value)}
        size="md"
      >
        {dataInDropdown.imageTypes.map((type) => (
          <SelectItem key={type} value={type}>
            {type}
          </SelectItem>
        ))}
      </Select>

      <Select
        variant="faded"
        label="Room Type"
        labelPlacement="outside"
        placeholder=" "
        value={roomType}
        onChange={(e) => setRoomType(e.target.value)}
        size="md"
      >
        {dataInDropdown.roomTypes.map((type) => (
          <SelectItem key={type} value={type}>
            {type}
          </SelectItem>
        ))}
      </Select>

      <Select
        variant="faded"
        label="Style"
        labelPlacement="outside"
        placeholder=" "
        value={style}
        onChange={(e) => setStyle(e.target.value)}
        size="md"
      >
        {dataInDropdown.styles.map((s) => (
          <SelectItem key={s} value={s}>
            {s}
          </SelectItem>
        ))}
      </Select>

      <Textarea
        placeholder=" "
        label="Text Prompt"
        labelPlacement="outside"
        value={textPrompt}
        onChange={(e) => setTextPrompt(e.target.value)}
        minRows={4}
        size="md"
        variant="faded"
      />

      <Button
        onClick={() => {
          setGenerateClickState(true);
          // handleSubmit();
        }}
        color="warning"
        className="text-black font-bold"
        style={{
          height: "40px",
          width: "100%",
        }}
        size="md"
      >
        Generate
      </Button>
    </div>
  );
};

export default NewProjectTab;
