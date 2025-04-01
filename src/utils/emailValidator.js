export const mockValidateEmail = async (email) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email.includes('@')) resolve({ valid: true });
        else resolve({ valid: false });
      }, 100);
    });
  };
  