export function checkForActiveMaterial(activeMaterialList, activeMaterial) {
  if (
    zilver.includes(activeMaterial) &&
    activeMaterialList.includes("zilver")
  ) {
    return true;
  } else if (
    geelgoud.includes(activeMaterial) &&
    activeMaterialList.includes("geelgoud")
  ) {
    return true;
  } else if (
    rosegoud.includes(activeMaterial) &&
    activeMaterialList.includes("rosegoud")
  ) {
    return true;
  }
  return false;
}

export function calculatePrice(selectedOptions, optionSets) {
  let totalPrice = 0;
  for (let i = 0; i < selectedOptions.length; i++) {
    const optionKey = selectedOptions[i].key + "Options";
    const currentOptionSet = findOptionSet(optionSets, optionKey);

    const selectedTargetValue = selectedOptions[i].value;
    if (typeof selectedTargetValue == "string") {
      if (!currentOptionSet) return;
      const selectedOptionSet = currentOptionSet.find(
        (option) => option.value === selectedTargetValue
      );
      totalPrice += selectedOptionSet.price || 0;
    } else {
      selectedTargetValue.forEach((selectedTarget) => {
        if (selectedTarget.key === "extraWoord") {
          if (selectedTarget.value == "1 extra woord") {
            totalPrice += 14.95;
          } else if (selectedTarget.value == "2 extra woorden") {
            totalPrice += 19.95;
          }
        }
        const price = findPriceByValue(
          optionSets,
          selectedTarget.key,
          selectedTarget.value
        );
        totalPrice += price || 0;
      });
    }
  }
  return totalPrice;
}

export function findOptionSet(optionSets, optionSetKey) {
  return optionSets[optionSetKey] || null;
}

export function findPriceByValue(optionSets, targetKey, targetValue) {
  const optionSet = optionSets[targetKey + "Options"];
  // console.log(optionSets);
  // console.log("find price by value");

  // console.log(targetKey);
  // console.log(targetValue);
  if (optionSet && Array.isArray(optionSet)) {
    const foundOption = optionSet.find(
      (option) => option.value === targetValue
    );
    // console.log("foundOption");
    // console.log(foundOption);

    if (foundOption && typeof foundOption.price !== "undefined") {
      return foundOption.price;
    }
  }

  return null;
}
