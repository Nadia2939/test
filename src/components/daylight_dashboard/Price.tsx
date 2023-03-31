export default function Price(props: {title: string; price: number; showDollarSign: boolean}) {
  return (
    <>
      <h2 className="font-eudoxussans font-bold text-white/30 text-lg">{props.title}</h2> {/*text-xl*/}
      <p className="text-xl">{`${props.showDollarSign ? '$' : ''}${props.price}`}</p> {/*text-xl*/}
    </>
  );
}
