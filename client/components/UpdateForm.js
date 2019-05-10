import React from 'react';

const UpdateForm = props => {
  console.log(props);
  return (
    <form onSubmit={this.handleSubmit}>
      <label className="formLabel" htmlFor="title">
        Title:{' '}
      </label>
      <input
        type="text"
        name="title"
        value={this.state.title}
        onChange={this.handleChange}
      />
      <br />
      <label className="formLabel" htmlFor="description">
        Description:{' '}
      </label>
      <input
        type="text"
        name="description"
        value={this.state.description}
        onChange={this.handleChange}
      />
      <br />
      <button id="submit" type="submit">
        Submit
      </button>
    </form>
  );
};
export default UpdateForm;
