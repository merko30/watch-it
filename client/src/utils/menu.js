export const INFO = {
  text: "Book information",
  key: "info"
};

export const CURRENTLY_READING = {
  text: "Currently reading",
  key: "reading"
};

export const READ = {
  text: "Read",
  key: "read"
};

export const WISHLIST = {
  text: "Wishlist",
  key: "wishlist"
};

export const REMOVE = { text: "Remove", key: "remove" };

const initialButtons = [
  { text: "Cancel", icon: "close", iconColor: "#25de5b" }
];

export const statusesToShow = (bookExists, showInfo) => {
  let options = [];
  const CANCEL_INDEX = options.length - 1;

  if (Boolean(bookExists)) {
    if (bookExists.status === "wishlist") {
      options = [
        ...(showInfo ? [INFO] : []),
        CURRENTLY_READING,
        READ,
        REMOVE,
        ...initialButtons
      ];
    } else if (bookExists.status === "reading") {
      options = [...(showInfo ? [INFO] : []), READ, REMOVE, ...initialButtons];
    } else if (bookExists.status === "read") {
      options = [...(showInfo ? [INFO] : []), REMOVE, ...initialButtons];
    }

    const DESTRUCTIVE_INDEX = options.length - 2;
    return {
      options,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX
    };
  } else {
    options = [...(showInfo ? [INFO] : []), WISHLIST, CURRENTLY_READING, READ];
    return { options, cancelButtonIndex: CANCEL_INDEX };
  }
};
