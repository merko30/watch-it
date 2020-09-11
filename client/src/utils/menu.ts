interface Option {
  text: string;
  key: string;
}

interface Book {
  status: 'wishlist' | 'reading' | 'read';
}

export const INFO = {
  text: 'Book information',
  key: 'info',
};

export const CURRENTLY_READING = {
  text: 'Currently reading',
  key: 'reading',
};

export const READ = {
  text: 'Read',
  key: 'read',
};

export const WISHLIST = {
  text: 'Wishlist',
  key: 'wishlist',
};

export const REMOVE = {text: 'Remove', key: 'remove'};

export const statusesToShow = (bookExists: Book, showInfo: boolean) => {
  let options: Option[] = showInfo ? [INFO] : [];
  const CANCEL_INDEX = options.length - 1;

  if (Boolean(bookExists)) {
    if (bookExists.status === 'wishlist') {
      options = [
        ...options,
        CURRENTLY_READING,
        READ,
        REMOVE,
        /*...initialButtons*/
      ];
    } else if (bookExists.status === 'reading') {
      options = [READ, REMOVE /*...initialButtons*/];
    } else if (bookExists.status === 'read') {
      options = [...options, REMOVE /*...initialButtons*/];
    }

    const DESTRUCTIVE_INDEX = options.length - 2;
    return {
      options,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX,
    };
  } else {
    options = [...(showInfo ? [INFO] : []), WISHLIST, CURRENTLY_READING, READ];
    return {options, cancelButtonIndex: CANCEL_INDEX};
  }
};
