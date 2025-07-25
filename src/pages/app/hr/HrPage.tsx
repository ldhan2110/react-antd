import type React from 'react';
import Table, { type TableColumnProps } from '../../../components/tables/Table';
import { observer } from 'mobx-react-lite';
import appStore from '../../../stores/AppStore';
import { Button } from 'antd';

const columns: TableColumnProps = [
  {
    title: 'Name',
    field: 'name',
    width: 150,
    headerSort: true,
  },
  { title: 'Age', field: 'age', hozAlign: 'left', formatter: 'progress', width: 150 },
  { title: 'Favourite Color', field: 'col', width: 150 },
  { title: 'Date Of Birth', field: 'dob', hozAlign: 'center', width: 150 },
];

const data = [
  { id: 1, name: 'Oli Bob', age: '12', col: 'red', dob: '' },
  { id: 2, name: 'Mary May', age: '1', col: 'blue', dob: '14/05/1982' },
  { id: 3, name: 'Christine Lobowski', age: '42', col: 'green', dob: '22/05/1982' },
  { id: 4, name: 'Brendon Philips', age: '125', col: 'orange', dob: '01/08/1980' },
  { id: 5, name: 'Margret Marmajuke', age: '16', col: 'yellow', dob: '31/01/1999' },
];

const HrPage: React.FC = observer(() => {
  const { hr } = appStore.state;
  return (
    <div className="flex items-center justify-center h-full flex-col">
      <div className="max-w-4xl w-full">
        <Button onClick={() => appStore.setSelectedEmployeeId('203741')}>Set Employee ID</Button>
        <div>{hr.selectedEmployeeId}</div>
        <Table
          data={data}
          columns={columns}
          layout="fitDataStretch"
          options={{
            //enable range selection
            selectableRange: 1,
            selectableRangeColumns: true,
            selectableRangeRows: true,
            selectableRangeClearCells: true,

            //change edit trigger mode to make cell navigation smoother
            editTriggerEvent: 'dblclick',

            //configure clipboard to allow copy and paste of range format data
            clipboard: true,
            clipboardCopyStyled: false,
            clipboardCopyConfig: {
              rowHeaders: false,
              columnHeaders: false,
            },
            clipboardCopyRowRange: 'range',
            clipboardPasteParser: 'range',
            clipboardPasteAction: 'range',

            rowHeader: {
              resizable: false,
              frozen: true,
              width: 40,
              hozAlign: 'center',
              formatter: 'rownum',
              cssClass: 'range-header-col',
              editor: false,
            },

            //setup cells to work as a spreadsheet
            columnDefaults: {
              headerSort: false,
              headerHozAlign: 'center',
              editor: 'input',
              resizable: 'header',
              width: 100,
            },
          }}
        />
      </div>
    </div>
  );
});

export default HrPage;
