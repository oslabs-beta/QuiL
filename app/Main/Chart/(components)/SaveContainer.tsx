import React from "react";

function SaveContainer() {
  return (
    <div>
      {/* The button to open modal */}
      <label htmlFor="my-modal-3" className="btn">
        Save
      </label>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">
            Congratulations random Internet user!
          </h3>
        </div>
      </div>
    </div>
  );
}

export default SaveContainer;

<div className="card w-96 bg-base-100 shadow-xl">
  <div className="card-body">
    <form>
      <label className="label" htmlFor="URI Nickname">
        URI Nickname:
      </label>
      <input
        className="input input-bordered w-full max-w-xs"
        name="username"
        type="text"
        placeholder="URI Nickname"
      ></input>
      <label className="label" htmlFor="URI Nickname">
        URI String:
      </label>
      <input
        className="input input-bordered w-full max-w-xs"
        name="username"
        type="text"
        placeholder="URI"
      ></input>
    </form>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Save</button>
    </div>
  </div>
</div>;
