"use client";

import { useState, useEffect, useRef } from "react";

import InputSelect from "../InputSelect";
import InputRadio from "../InputRadio";
import InputTextField from "../InputTextField";
import InputDate from "../InputDate";
import InputImageSwatchLarge from "../InputImageSwatchLarge";

import { tekstBinnenZijdeRingOptions, lettertypeOptions } from "./optionSets";

export default function Tekst({
  value,
  onChange,
  setOptionErrors,
  showErrors,
}) {
  const [error, setError] = useState([]);
  console.log("error");
  console.log(error);
  useEffect(() => {
    if (Array.isArray(value)) {
      const tekstBinnenZijdeRingValue = value.find(
        (item) => item.key === "tekstBinnenZijdeRing"
      ).value;
      const lettertypeValue = value.find(
        (item) => item.key === "lettertype"
      ).value;
      const initialenValue = value.find(
        (item) => item.key === "initialen"
      ).value;
      const datumValue = value.find((item) => item.key === "datum").value;
      const naamValue = value.find((item) => item.key === "naam").value;
      const woord1Value = value.find((item) => item.key === "1 woord").value;
      const woord2Value = value.find((item) => item.key === "2 woorden").value;
      const woord3Value = value.find((item) => item.key === "3 woorden").value;
      const woord4Value = value.find((item) => item.key === "4 woorden").value;

      console.log("tekstBinnenZijdeRingValue");
      console.log(tekstBinnenZijdeRingValue);
      switch (tekstBinnenZijdeRingValue) {
        case "Initialen/letters/tekens":
          if (initialenValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["initialen"]: "Veld initiaal mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["initialen"]: "",
            }));
          }
          if (lettertypeValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["lettertype"]: "Kies een lettertype",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["lettertype"]: "",
            }));
          }
          break;
        case "Geen tekst":
        case "Hartje ♥ symbool":
        case "Infinity ∞ teken":
          setError((prevState) => ({
            ...prevState,
            ["tekstBinnenZijdeRing"]: "",
          }));
          break;
        case "Datum":
          if (datumValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["datum"]: "Veld datum mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["datum"]: "",
            }));
          }
          if (lettertypeValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["lettertype"]: "Kies een lettertype",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["lettertype"]: "",
            }));
          }
          break;
        case "Naam":
          if (naamValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["naam"]: "Veld naam mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["naam"]: "",
            }));
          }
          if (lettertypeValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["lettertype"]: "Kies een lettertype",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["lettertype"]: "",
            }));
          }
          break;
        case "Naam en datum":
          if (naamValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["naam"]: "Veld naam mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["naam"]: "",
            }));
          }
          if (datumValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["datum"]: "Veld datum mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["datum"]: "",
            }));
          }
          if (lettertypeValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["lettertype"]: "Kies een lettertype",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["lettertype"]: "",
            }));
          }
        case "1 woord":
          if (woord1Value == "") {
            setError((prevState) => ({
              ...prevState,
              ["woord1"]: "Veld woord 1 mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["woord1"]: "",
            }));
          }
          if (lettertypeValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["lettertype"]: "Kies een lettertype",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["lettertype"]: "",
            }));
          }
          break;
        case "2 woorden":
          if (woord2Value == "") {
            setError((prevState) => ({
              ...prevState,
              ["woord2"]: "Veld woord 2 mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["woord2"]: "",
            }));
          }
          if (lettertypeValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["lettertype"]: "Kies een lettertype",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["lettertype"]: "",
            }));
          }
          break;
        case "3 woorden":
          if (woord3Value == "") {
            setError((prevState) => ({
              ...prevState,
              ["woord3"]: "Veld woord 3 mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["woord3"]: "",
            }));
          }
          if (lettertypeValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["lettertype"]: "Kies een lettertype",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["lettertype"]: "",
            }));
          }
          break;
        case "4 woorden":
          if (woord4Value == "") {
            setError((prevState) => ({
              ...prevState,
              ["woord4"]: "Veld woord 4 mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["woord4"]: "",
            }));
          }
          if (lettertypeValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["lettertype"]: "Kies een lettertype",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["lettertype"]: "",
            }));
          }
          break;

        default:
          if (tekstBinnenZijdeRingValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["tekstBinnenZijdeRing"]: "Veld mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["tekstBinnenZijdeRing"]: "",
            }));
          }
      }

      if (
        tekstBinnenZijdeRingValue == "Geen tekst" ||
        tekstBinnenZijdeRingValue == "Initialen/letters/tekens" ||
        tekstBinnenZijdeRingValue == "Hartje ♥ symbool" ||
        tekstBinnenZijdeRingValue == "Infinity ∞ teken" ||
        tekstBinnenZijdeRingValue == "Naam en datum" ||
        tekstBinnenZijdeRingValue == "Naam" ||
        tekstBinnenZijdeRingValue == "Datum" ||
        tekstBinnenZijdeRingValue == "1 woord" ||
        tekstBinnenZijdeRingValue == "2 woorden" ||
        tekstBinnenZijdeRingValue == "3 woorden" ||
        tekstBinnenZijdeRingValue == "4 woorden"
      ) {
        setError((prevState) => ({
          ...prevState,
          ["tekstBinnenZijdeRing"]: "",
        }));
      }
    }
  }, [value]);

  useEffect(() => {
    console.log("errors");
    console.log(error);

    const allValuescorrect = Object.values(error).every(
      (value) => value === ""
    );
    console.log("Are all values empty?", allValuescorrect);
    if (allValuescorrect) {
      setOptionErrors((prevState) => ({
        ...prevState,
        ["tekst"]: false,
      }));
    } else {
      setOptionErrors((prevState) => ({
        ...prevState,
        ["tekst"]: true,
      }));
    }
  }, [error]);

  const [values, setValues] = useState([
    {
      key: "tekstBinnenZijdeRing",
      value: value?.tekstBinnenZijdeRing?.value || "",
    },
    { key: "lettertype", value: value?.naam?.value || "" },
    { key: "initialen", value: value?.naam?.value || "" },
    { key: "datum", value: value?.naam?.value || "" },
    { key: "naam", value: value?.naam?.value || "" },
    { key: "1 woord", value: value?.naam?.value || "" },
    { key: "2 woorden", value: value?.naam?.value || "" },
    { key: "3 woorden", value: value?.naam?.value || "" },
    { key: "4 woorden", value: value?.naam?.value || "" },
  ]);

  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    onChange(values);
  }, [values]);

  const handleChange = (changedKey, newValue) => {
    setValues((prevValues) =>
      prevValues.map((item) =>
        item.key === changedKey ? { ...item, value: newValue } : item
      )
    );

    onChange(values);
  };
  const tekstBinnenZijdeRingValue = values.find(
    (item) => item.key === "tekstBinnenZijdeRing"
  ).value;

  return (
    <>
      <div className="relative">
        {showErrors && (
          <p className="absolute  -bottom-4 left-0 text-red-700">
            {error["tekstBinnenZijdeRing"]}
          </p>
        )}
        <InputSelect
          value={tekstBinnenZijdeRingValue}
          onChange={(newTekstValue) =>
            handleChange("tekstBinnenZijdeRing", newTekstValue)
          }
          title="Tekst binnenzijde ring:"
          options={tekstBinnenZijdeRingOptions}
        />
      </div>

      {tekstBinnenZijdeRingValue == "Initialen/letters/tekens" && (
        <div className="relative">
          {showErrors && (
            <p className="absolute  -bottom-4 left-0 text-red-700">
              {error["initiaal"]}
            </p>
          )}
          <InputTextField
            value={values.find((item) => item.key === "initialen")?.value || ""}
            onChange={(newInitialenValue) =>
              handleChange("initialen", newInitialenValue)
            }
            title="Initialen/letters/tekens:"
          />
        </div>
      )}
      {(tekstBinnenZijdeRingValue == "Datum" ||
        tekstBinnenZijdeRingValue == "Naam en datum") && (
        <div className="relative">
          {showErrors && (
            <p className="absolute  -bottom-4 left-0 text-red-700">
              {error["datum"]}
            </p>
          )}
          <InputDate
            value={values.find((item) => item.key === "datum")?.value || ""}
            onChange={(newDateValue) => handleChange("datum", newDateValue)}
            title="Datum:"
          />
        </div>
      )}
      {(tekstBinnenZijdeRingValue == "Naam" ||
        tekstBinnenZijdeRingValue == "Naam en datum") && (
        <div className="relative">
          {showErrors && (
            <p className="absolute  -bottom-4 left-0 text-red-700">
              {error["naam"]}
            </p>
          )}
          <InputTextField
            value={values.find((item) => item.key === "naam")?.value || ""}
            onChange={(newNaamValue) => handleChange("naam", newNaamValue)}
            title="Naam:"
          />
        </div>
      )}
      {(tekstBinnenZijdeRingValue == "1 woord" ||
        tekstBinnenZijdeRingValue == "2 woorden" ||
        tekstBinnenZijdeRingValue == "3 woorden" ||
        tekstBinnenZijdeRingValue == "4 woorden") && (
        <div className="relative">
          {showErrors && (
            <p className="absolute  -bottom-4 left-0 text-red-700">
              {error["woord1"]}
            </p>
          )}
          <InputTextField
            value={values.find((item) => item.key === "1 woord")?.value || ""}
            onChange={(new1WoordValue) =>
              handleChange("1 woord", new1WoordValue)
            }
            title="1 Woord:"
          />
        </div>
      )}
      {(tekstBinnenZijdeRingValue == "2 woorden" ||
        tekstBinnenZijdeRingValue == "3 woorden" ||
        tekstBinnenZijdeRingValue == "4 woorden") && (
        <div className="relative">
          {showErrors && (
            <p className="absolute  -bottom-4 left-0 text-red-700">
              {error["woord2"]}
            </p>
          )}
          <InputTextField
            value={values.find((item) => item.key === "2 woorden")?.value || ""}
            onChange={(new2WoordenValue) =>
              handleChange("2 woorden", new2WoordenValue)
            }
            title="2 Woorden:"
          />
        </div>
      )}
      {(tekstBinnenZijdeRingValue == "3 woorden" ||
        tekstBinnenZijdeRingValue == "4 woorden") && (
        <div className="relative">
          {showErrors && (
            <p className="absolute  -bottom-4 left-0 text-red-700">
              {error["woord3"]}
            </p>
          )}
          <InputTextField
            value={values.find((item) => item.key === "3 woorden")?.value || ""}
            onChange={(new3WoordenValue) =>
              handleChange("3 woorden", new3WoordenValue)
            }
            title="3 Woorden:"
          />
        </div>
      )}
      {tekstBinnenZijdeRingValue == "4 woorden" && (
        <div className="relative">
          {showErrors && (
            <p className="absolute  -bottom-4 left-0 text-red-700">
              {error["woord4"]}
            </p>
          )}
          <InputTextField
            value={values.find((item) => item.key === "4 woorden")?.value || ""}
            onChange={(new4WoordenValue) =>
              handleChange("4 woorden", new4WoordenValue)
            }
            title="4 Woorden:"
          />
        </div>
      )}
      {(tekstBinnenZijdeRingValue == "Initialen/letters/tekens" ||
        tekstBinnenZijdeRingValue == "Naam" ||
        tekstBinnenZijdeRingValue == "Datum" ||
        tekstBinnenZijdeRingValue == "Naam en datum" ||
        tekstBinnenZijdeRingValue == "1 woord" ||
        tekstBinnenZijdeRingValue == "2 woorden" ||
        tekstBinnenZijdeRingValue == "3 woorden" ||
        tekstBinnenZijdeRingValue == "4 woorden") && (
        <div className="relative">
          {showErrors && (
            <p className="absolute  -bottom-4 left-0 text-red-700">
              {error["lettertype"]}
            </p>
          )}
          <InputImageSwatchLarge
            value={
              values.find((item) => item.key === "lettertype")?.value || ""
            }
            onChange={(newLettertypeValue) =>
              handleChange("lettertype", newLettertypeValue)
            }
            title="Lettertype:"
            options={lettertypeOptions}
          />
        </div>
      )}
    </>
  );
}
