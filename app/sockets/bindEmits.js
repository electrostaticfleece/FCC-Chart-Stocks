import actionCreators from 'actions/chart';

export default function bindEmits(socket, dispatch) {
  let actionKeys = Object.keys(actionCreators);

  actionKeys.forEach((key) => {
    const actionCreator = actionCreators[key];
    const action = actionCreator();
    const { meta, type } = action;

    if(meta && meta.serverEmit) {
      socket.on(type, (data) => {
        dispatch(actionCreator(data));
      });
    }

  });
};