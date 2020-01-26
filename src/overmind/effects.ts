export const authenticate = (username: string, password: string) =>
  new Promise<boolean>((resolve, reject) => {
    setTimeout(() => {
      if (username === 'zamotany' && password === 'password') {
        resolve(true);
      } else if (username === 'zamotany') {
        resolve(false);
      } else {
        reject(new Error('no such user'));
      }
    }, 2000);
  });
