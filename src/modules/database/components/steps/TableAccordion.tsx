'use client';

import { Column, MetaInfo } from '@/modules/table/types';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { useState } from 'react';

interface TableAccordionProps {
  table: MetaInfo;
  onColumnEdit?: (schema: string, table: string, columns: Column[]) => void;
  onDescriptionEdit?: (schema: string, table: string, description: string) => void;
  onDelete?: (schema: string, table: string) => void;
}

export const TableAccordion = ({
  table,
  onColumnEdit,
  onDescriptionEdit,
  onDelete,
}: TableAccordionProps) => {
  const [columns, setColumns] = useState<Column[]>(table.columns);
  const [description, setDescription] = useState(table.table_description || '');
  const [editing, setEditing] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCellEdit = (params: Record<string, string>) => {
    const updated = columns.map((col) =>
      col.name === params.id ? { ...col, [params.field]: params.value } : col,
    );
    setColumns(updated);
    onColumnEdit?.(table.schema_name, table.table_name, updated);
  };

  const handleDescriptionEdit = () => {
    onDescriptionEdit?.(table.schema_name, table.table_name, description);
    setEditing(false);
  };

  const gridCols: GridColDef[] = [
    { field: 'column_seq', headerName: '순서', width: 80 },
    { field: 'name', headerName: '한글명', editable: true },
    {
      field: 'description',
      headerName: '설명',
      editable: true,
      width: 200,
    },
    { field: 'data_type', headerName: '타입' },
    { field: 'default_value', headerName: '기본값' },
    { field: 'is_primary_key', headerName: 'PK', type: 'boolean', width: 80 },
    { field: 'is_foreign_key', headerName: 'FK', type: 'boolean', width: 80 },
    { field: 'is_unique', headerName: 'Unique', type: 'boolean', width: 100 },
    { field: 'is_nullable', headerName: 'Nullable', type: 'boolean', width: 100 },
    { field: 'foreign_key_table', headerName: 'FK 테이블명' },
    { field: 'foreign_key_column', headerName: 'FK 컬럼명' },
  ];

  const gridRows: GridRowsProp = columns.map((col) => ({
    id: col.name,
    ...col,
  }));

  return (
    <Accordion
      disableGutters
      expanded={expanded}
      onChange={(_, newExpanded) => {
        if (!editing) {
          setExpanded(newExpanded);
        }
      }}
    >
      <AccordionSummary expandIcon={!editing && <ExpandMoreIcon />}>
        <Box className="flex items-center justify-between w-full gap-4">
          <Typography sx={{ minWidth: '200px', flexShrink: 0 }}>
            {`${table.schema_name}.${table.table_name}`}
          </Typography>

          {editing ? (
            <TextField
              fullWidth
              onChange={(e) => setDescription(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              placeholder="테이블 설명을 입력하세요"
              size="small"
              value={description}
            />
          ) : (
            <Typography color="text.secondary" sx={{ flexGrow: 1 }}>
              {description || '설명 없음'}
            </Typography>
          )}

          <Box className="flex gap-2">
            {editing ? (
              <DoneOutlinedIcon fontSize="small" onClick={handleDescriptionEdit} />
            ) : (
              <EditOutlinedIcon
                fontSize="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditing(true);
                }}
              />
            )}

            <DeleteOutlineIcon
              fontSize="small"
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm('정말 삭제하시겠습니까?')) {
                  onDelete?.(table.schema_name, table.table_name);
                }
              }}
            />
          </Box>
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        <DataGrid
          columns={gridCols}
          disableRowSelectionOnClick
          processRowUpdate={(newRow) => {
            handleCellEdit({ id: newRow.name, field: 'name', value: newRow.name });
            handleCellEdit({ id: newRow.name, field: 'description', value: newRow.description });
            return newRow;
          }}
          rows={gridRows}
          sx={{ backgroundColor: '#fff' }}
        />
      </AccordionDetails>
    </Accordion>
  );
};
