function Formula(props) {
  console.log(props);
  const { z, setz } = props.pro;
  console.log(z);
  // return (
  //   <div>
  //     {z}
  //     <button onClick={() => setz("nik")}> love me</button>
  //   </div>
  // );
}
const Formulaz = (props) => {
  const { z, setz } = props;
  // console.log("0000000000000----" + z);
};

export { Formula, Formulaz };
