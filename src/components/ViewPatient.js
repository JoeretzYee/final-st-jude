import React from "react";
import { useParams } from "react-router-dom";

function ViewPatient() {
  let params = useParams();
  return <div>view patient {params.patientId}</div>;
}

export default ViewPatient;
