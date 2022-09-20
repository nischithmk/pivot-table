import { useEffect } from "react";
import { useState, useCallback } from "react";
import { Formula, Formulaz } from "./formula";
import Sum from "./formulas/sum";
function Table() {
  const [isCellClicked, setIsCellClicked] = useState(false);
  const [inp, setInp] = useState({});
  const [activeID, setActiveID] = useState("");
  const [prevActiveID, setPrevActiveID] = useState("");
  const [currentCell, setCurrentCell] = useState(false);
  const [formulaValues, setFormulaValues] = useState([]);
  const [HandleSum, setHandleSum] = useState(false);
  const [val_dict, setVal_dict] = useState({});
  const [sum_value, setSumValue] = useState("");
  const [sum_clicked, setSumClicked] = useState(false);
  const [z, setz] = useState("nis");
  const [mdown, setMdown] = useState("");
  const [dragdict, setdragdict] = useState({});

  // const prop = {
  //   activeID: activeID,
  //   setVal_dict: setVal_dict,
  //   setSumClicked: setSumClicked,
  //   currentCell: currentCell,
  //   val_dict: val_dict,
  //   setInp: setInp,
  //   inp: inp,
  //   setHandleSum: setHandleSum,
  //   setSumValue: setSumValue,
  //   setCurrentCell: setCurrentCell,
  //   HandleSum: HandleSum,
  //   sum_clicked: sum_clicked,
  //   sum_value: sum_value,
  //   value: sum_value,
  // };

  // asssign id to every element

  useEffect(() => {
    var tr = document.getElementsByTagName("tr");
    for (var x = 1; x < tr.length; x++) {
      for (var y = 1; y < tr[x].childNodes.length; y++) {
        tr[x].childNodes[y].setAttribute(
          "id",
          tr[x].id > 9
            ? (tr[x].childNodes[y].getAttribute("id") + tr[x].id).slice(0, 3)
            : (tr[x].childNodes[y].getAttribute("id") + tr[x].id).slice(0, 2)
        );
        tr[x].childNodes[y].childNodes[0].setAttribute(
          "name",
          tr[x].id > 9
            ? (tr[x].childNodes[y].getAttribute("id") + tr[x].id).slice(0, 3)
            : (tr[x].childNodes[y].getAttribute("id") + tr[x].id).slice(0, 2)
        );
      }
    }
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    console.log(e);
    setPrevActiveID(activeID);
    setActiveID(document.activeElement.parentElement.id);
    console.log(" setMdown calling...");
    setMdown("down");
  };

  const handleInputChange = (input) => {
    const { name, value } = input;
    setInp({ ...inp, [name]: value });
    if (value == "=SUM") {
      setHandleSum(true);
      HandleSumFunction();
    }
  };

  // Start of sum function
  useEffect(() => {
    var cur = document.getElementById(currentCell);
    if (cur) {
      var child_node = cur.childNodes[0];
      child_node.value = sum_value + Object.keys(val_dict).join(",") + ")";
    }
  }, [val_dict]);

  useEffect(() => {
    // console.log("inside useeffect");
    if (HandleSum) {
      // console.log("inside useeffect if");
      document.addEventListener("click", clickEvent);
      document.addEventListener("keypress", keypressEvent);
    } else {
      // console.log("inside useeffect else");
      document.removeEventListener("click", clickEvent);
      document.removeEventListener("keypress", keypressEvent);
    }
    return () => {
      document.removeEventListener("click", clickEvent);
      document.removeEventListener("keypress", keypressEvent);
    };
  }, [HandleSum, val_dict, sum_value, sum_clicked]);

  const clickEvent = () => {
    console.log("inside clickEvent");
    if (!(document.activeElement.value == "=SUM")) {
      setVal_dict((val_dict) => ({
        ...val_dict,
        [document.activeElement.name]: document.activeElement.value,
      }));
    }
    setSumClicked(true);

    var cur = document.getElementById(currentCell);
    if (cur) {
      console.log("INSIDE CURR");
      console.log(val_dict);
      var child_node = cur.childNodes[0];
      var k = document.getElementById("A1");
      cur.style.position = "absolute";
      cur.style.width = child_node.value.length + 5.5 + "ch";
      cur.style.zIndex = "2";
      child_node.style.position = "relative";
      child_node.style.width = child_node.value.length + 5.5 + "ch";
      child_node.style.zIndex = "3";
    }
  };

  const keypressEvent = (event) => {
    console.log("inside keypressEvent");
    if (event.key === "Enter") {
      var total = 0;
      var val_values = Object.values(val_dict);
      for (var i in val_values) {
        console.log("inside for " + val_values[i]);
        if (val_values[i] != "" && val_values[i] != "=") {
          console.log("inside if " + val_values[i]);
          total += parseInt(val_values[i]);
        }
      }
      if (document.getElementById(currentCell)) {
        var curr = document.getElementById(currentCell);
        curr.childNodes[0].value = total;
        curr.style.width = "80px";
        curr.style.position = "relative";
        curr.style.zIndex = "1";
        curr.childNodes[0].style.width = "80px";
        curr.childNodes[0].style.position = "relative";
        curr.childNodes[0].style.zIndex = "1";
        setInp({ ...inp, [currentCell]: total });
        setHandleSum(false);
        setVal_dict({});
        setSumValue("");
        setCurrentCell("");
        setSumClicked(false);
        return;
      }
    }
  };
  const HandleSumFunction = () => {
    console.log("inside sum function and state of HandleSum " + HandleSum);
    var val1 = activeID;
    setCurrentCell(val1);
    setSumValue("=SUM(");
  };

  // End of sum function

  useEffect(() => {
    console.log("inside useeffect of mouse down and up");
    if (mdown == "down") {
      console.log("inside mdown loop");
      document.addEventListener("mousedown", mousedownEvent);
      document.addEventListener("mouseup", mouseupEvent);
    } else {
      document.removeEventListener("mousedown", mousedownEvent);
      document.removeEventListener("mouseup", mouseupEvent);
    }
    return () => {
      document.removeEventListener("mousedown", mousedownEvent);
      document.removeEventListener("mouseup", mouseupEvent);
    };
  }, [mdown]);

  useEffect(() => {
    console.log("inside useeffect of mouseover");
    if (mdown == "down") {
      document.addEventListener("mouseover", mousemoveEvent);
    } else {
      document.removeEventListener("mouseover", mousemoveEvent);
    }
    return () => {
      document.removeEventListener("mouseover", mousemoveEvent);
    };
  }, [mdown]);

  const mousedownEvent = (e) => {
    setdragdict({});
    console.log("down");
  };

  //to drag and select columns
  const mousemoveEvent = (e) => {
    console.log(mdown);
    if (e.path[0].nodeName == "INPUT") {
      console.log(e.path[0].name + " - " + e.path[0].value);
      console.log(e.path[1]);
      e.path[1].style.border = "solid 2.4px #809fff";
      setdragdict((dragdict) => ({
        ...dragdict,
        [e.path[0].name]: e.path[0].value,
      }));
    }
  };
  //to drag and select columns
  const mouseupEvent = () => {
    console.log("up");
    var d = Object.keys(dragdict);
    for (var i in d) {
      console.log(d[i]);
      document.getElementById(d[i]).style.border =
        "solid 0.1px rgb(106, 116, 116)";
    }
    setMdown("");
    // setdragdict({});
  };

  //to drag and select columns
  useEffect(() => {
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState == "visible") {
        document.activeElement.blur();
      }
    });
  }, []);

  //border color change on active
  useEffect(() => {
    if (activeID.length > 1) {
      if (document.activeElement.parentNode.id == activeID) {
        document.getElementById(activeID).style.border = "solid 2.4px #809fff";
      }
      if (prevActiveID.length > 1)
        document.getElementById(prevActiveID).style.border =
          "solid 0.1px rgb(106, 116, 116)";
    }
  }, [activeID, prevActiveID]);

  var headings = [];
  var column1 = [];
  var rem_columns = [];
  var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (var i = 0; i < 26; i++) {
    headings.push(
      <th
        id={letters[i]}
        style={{
          backgroundColor: "#d1e0e0",
          fontSize: "15px",
          color: "grey",
        }}
      >
        {letters[i]}
      </th>
    );
  }

  // remaining rows
  for (var i = 0; i < 26; i++) {
    rem_columns.push(
      <td id={letters[i]} onFocus={handleClick}>
        <input
          type="text"
          id=""
          name={letters[i]}
          onChange={(e) => handleInputChange(e.target)}
          // onClick={() => setmdown(true)}
        />
      </td>
    );
  }
  for (var i = 0; i < 51; i++) {
    column1.push(
      <tr id={i}>
        <td
          style={{
            color: "grey",
            padding: "5px",
            backgroundColor: "#d1e0e0",
            fontSize: "15px",
          }}
        >
          {i}
        </td>
        {rem_columns}
      </tr>
    );
  }
  Formulaz({ z: z, setz: setz });

  return (
    <div>
      <h1>EXCEL</h1>
      <Sum />
      <div class="wrapper">
        <table>
          <thead>
            <tr>
              <th>&nbsp;</th>
              {headings}
            </tr>
          </thead>
          <tbody>{column1}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
