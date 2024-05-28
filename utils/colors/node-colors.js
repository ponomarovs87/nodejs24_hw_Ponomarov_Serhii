const styles = {
  reset: "\x1b[0m",
  colors: {
    bright: "\x1b[1m",
    blink: "\x1b[5m",
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
  },
  textStyles: {
    bold: "\x1b[1m",
    dim: "\x1b[2m",
    italic: "\x1b[3m",
    underline: "\x1b[4m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",
    strikethrough: "\x1b[9m",
  },
  underlineColors: {
    black: "\x1b[4;30m",
    red: "\x1b[4;31m",
    green: "\x1b[4;32m",
    yellow: "\x1b[4;33m",
    blue: "\x1b[4;34m",
    magenta: "\x1b[4;35m",
    cyan: "\x1b[4;36m",
    white: "\x1b[4;37m",
  },
  backgroundColors: {
    bgBlack: "\x1b[40m",
    bgRed: "\x1b[41m",
    bgGreen: "\x1b[42m",
    bgYellow: "\x1b[43m",
    bgBlue: "\x1b[44m",
    bgMagenta: "\x1b[45m",
    bgCyan: "\x1b[46m",
    bgWhite: "\x1b[47m",
  },
};

const setTheme = (text, ...themes) => {
  if (Array.isArray(text)) {
    if (!themes) {
      return [
        ...text.map((item) =>
          typeof item === "object"
            ? JSON.stringify(item)
            : item
        ),
      ];
    }
    return [
      themes.join(""),
      ...text.map((item) =>
        typeof item === "object"
          ? JSON.stringify(item)
          : item
      ),
      styles.reset,
    ].join(" ");
  }
  if (!themes) {
    return [text];
  }
  return [themes.join(""), text, styles.reset].join(" ");
};

module.exports = { setTheme, ...styles };
