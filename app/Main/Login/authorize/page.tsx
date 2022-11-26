import { useRouter } from 'next/navigation';

const authorizeCode = async (code: number) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${code}`).then(
    res => res.json()
  );
  return res.name;
};

export default async function Page() {
  // const router = useRouter();
  const data = await authorizeCode(1);
  const render = '';
  return (
    <>
      <h1>{data}</h1>
    </>
  );
}
