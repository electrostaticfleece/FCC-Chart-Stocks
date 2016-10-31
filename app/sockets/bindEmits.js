import actionCreators from 'actions/stocks';

export default function bindEmits(socket, dispatch) {
  let actionKeys = Object.keys(actionCreators);

  actionKeys.forEach((key) => {
    const actionCreator = actionCreators[key]();
    const { meta, type } = actionCreator();

    if(meta && meta.serverEmit) {
      socket.on(type, (data) => {
        dispatch(actionCreator(data));
      });
    }

  });
};
