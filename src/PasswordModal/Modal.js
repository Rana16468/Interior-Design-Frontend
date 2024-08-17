import React from "react";

const Modal = () => {
  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
          <div>
            <p className="text-xl font-serif">
              <b> buyer email :</b> amsohelrana.me@gmail.com{" "}
            </p>{" "}
            <p className="text-xl font-serif">
              <b>password:</b>123456
            </p>{" "}
            <br />
            <p className="text-sm font-serif">
              <b>Saller Account And Admin email:</b>{" "}
              mdashifuzzamanakib@gmail.com
            </p>
            <p className="text-xl font-serif">
              <b> password:</b> 215019
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
