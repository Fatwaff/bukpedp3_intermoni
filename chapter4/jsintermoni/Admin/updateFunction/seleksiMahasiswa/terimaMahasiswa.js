import { getCookie } from "https://jscroot.github.io/cookie/croot.js";
import { getValue } from "https://jscroot.github.io/element/croot.js";

const putData = (
  target_url,
  datajson,
  tokenkey,
  tokenvalue,
  responseFunction
) => {
  const myHeaders = new Headers();
  myHeaders.append(tokenkey, tokenvalue);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(datajson);

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(target_url, requestOptions)
    .then((response) => response.json())
    .then((result) => responseFunction(result))
    .catch((error) => console.log("error", error));
};

const terimaMhs = (TERIMA) => {
  Swal.fire({
    title: "Konfirmasi Seleksi",
    text: "Terima Mahasiswa ini?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, Terima",
  }).then((result) => {
    if (result.isConfirmed) {
      const target_url =
        "https://asia-southeast2-bursakerja-project.cloudfunctions.net/intermoni-mahasiswa?id=" +
        TERIMA;
      const tokenvalue = getCookie("Authorization");
      const tokenkey = "Authorization";

      const responseFunction = (result) => responseData(result);
      const datajson = {
        seleksikampus: parseInt(getValue("buttonTerima")),
      };

      putData(target_url, datajson, tokenkey, tokenvalue, responseFunction);
    }
  });
};

const responseData = (result) => {
  if (result.status) {
    Swal.fire({
      icon: "success",
      title: "Terima Mahasiswa Berhasil",
      text: result.message,
    }).then(() => {
      window.location.reload();
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Konfirmasi Gagal",
      text: result.message,
    });
  }
};

window.terimaMhs = terimaMhs;
