import { getServer } from './server';

(async () => {
  const { url } = await (await getServer()).listen(4000);
  console.log(`Server running at ${url}`);
})();
