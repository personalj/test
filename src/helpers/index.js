export const truncate = (val, length) => {
  if (val && val.length > length) {
    return val.slice(0, length) + "...";
  }
  return val;
};
export const checkLength = (el, length) => {
  return el && el.length > length;
};

export const checkPhone = (val) => {
  const reg = /^[+]380\d{9}$/;
  return reg.test(val);
};

export const checkImageSize = (file, maxFileSize) => {
  return file && file.size < maxFileSize;
};
