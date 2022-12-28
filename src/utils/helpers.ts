export const resize = (url: string, size: 640) => {
  if (!url) {
    return url;
  }

  return url.match(/media\/screenshots/)
    ? url.replace("media/screenshots", `media/resize/${size}/-/screenshots`)
    : url.replace("/media/games/", `/media/resize/${size}/-/games/`);
};
