/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import type { ReactTabulatorProps } from 'react-tabulator/lib/ReactTabulator';
import ReactTabulator from 'react-tabulator/lib/ReactTabulator';
import './styles/table.style.css';
import { Button } from 'antd';

export type TableColumnProps = ReactTabulatorProps['columns'];

export type TableProps<T> = ReactTabulatorProps & { data?: T[] };

const Table = <T,>(props: TableProps<T>) => {
  const tableRef = React.useRef<any>(null);

  const handleUndo = () => {
    tableRef.current?.undo();
  };

  const handleRedo = () => {
    tableRef.current?.redo();
  };

  return (
    <>
      <div style={{ marginBottom: 10, gap: 10, display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={handleUndo}>Undo</Button>
        <Button onClick={handleRedo}>Redo</Button>
      </div>
      <ReactTabulator
        {...props}
        onRef={(ref) => {
          tableRef.current = ref.current;
        }}
        options={{
          ...props.options,
          history: true, // enable undo/redo history
        }}
      />
    </>
  );
};

export default React.forwardRef(Table) as <T>(
  props: TableProps<T> & { ref?: React.ForwardedRef<any> }
) => ReturnType<typeof Table>;
