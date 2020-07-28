import React from 'react';
import { Button } from 'antd';
import { useConcent } from 'concent';
import { MODEL_NAME } from './_model/index';
import { divide } from 'lodash';

const setup = (ctx) => {
  const { fetch } = ctx.moduleReducer;
  const { current, pageSize } = ctx.moduleState;

  const payload = {
    current,
    pageSize,
  };

  ctx.effect(() => {
    fetch(payload);
  }, []);

  // ctx.on('onOpenMemoDetailsEvent', async (payload) => {
  //  await openDrawerMemo(payload);
  //  onShowDrawer('Memo');
  // });

  return {
    settingData: { msg: 'setting msg' },
  };
};

const iState = { webUrl: '', pageWidth: 375, pageHeight: 667 };
const CtrlBox = React.memo((props) => {
  const ops = {
    props,
    module: MODEL_NAME,
    connect: ['loading'],
    setup,
    state: iState,
  };
  const ctx = useConcent(ops);
  const {
    state: {},
    settings,
    connectedState: {
      loading: { serverlist: serverLoading },
    },
    moduleComputed: mcu,
    moduleReducer: mrd,
    moduleState: ms,
  } = ctx;
  return (
    <>
      <div>
        <Button>qiter</Button>
      </div>
    </>
  );
});
export default CtrlBox;
