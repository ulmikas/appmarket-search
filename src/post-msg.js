const postMsg = (method, data) => {
  if (window != window.parent) {
    window.parent.postMessage(JSON.stringify({
      method,
      data,
    }), '*');
  }
};

export default postMsg;
