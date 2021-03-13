export default function getAdvice(ind: number): string[] {
  if (ind < 3) {
    return [
      "Low UV Exposure",
      "Wear sunglasses on bright days. In winter, reflection off snow can nearly double UV strength",
      "If you burn easily, cover up and use sunscreen",
    ];
  } else if (ind < 6) {
    return [
      "Moderate UV Exposure",
      "Take precautions, such as covering up and using sunscreen, if you will be outside",
      "Stay in shade near midday when the sun is strongest",
    ];
  } else if (ind < 8) {
    return [
      "High UV Exposure",
      "Protection against sunburn is needed",
      "Reduce time in the sun between 11 a.m. and 4 p.m.",
      "Cover up, wear a hat and sunglasses, and use sunscreen",
    ];
  } else if (ind < 11) {
    return [
      "Very high UV Exposure",
      "Take extra precautions, unprotected skin will be damaged and can burn quickly",
      "Try to avoid the sun between 11 a.m. and 4 p.m. Otherwise, seek shade, cover up, wear a hat and sunglasses, and use sunscreen",
    ];
  } else if (ind < 16) {
    return [
      "Extreme UV Exposure",
      "Take all precautions, unprotected skin can burn in minutes, note that white sand and other bright surfaces reflect UV and will increase the exposure",
      "Avoid the sun between 11 a.m. and 4 p.m.",
      "Seek shade, cover up, wear a hat and sunglasses, and use sunscreen",
    ];
  } else {
    return [
      "Ugh... You might be near a neutron star and have a bigger problem than sun screen can solve...",
    ];
  }
}
