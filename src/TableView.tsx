import React from 'react';

interface Inspection {
  shop_owner: string;
  food_type: string;
  stall_name: string;
  phone: string;
  marketType: string;
  marketName: string;
  customAdvice: string;
  results: Record<string, 'pass' | 'fail' | 'na'>;
  overall: 'PASS' | 'FAIL';
  advice: string[];
}

interface TableViewProps {
  inspections: Inspection[];
  checklistTitles: string[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const TableView: React.FC<TableViewProps> = ({ inspections, onEdit, onDelete }) => {
  return (
    <div className="table-wrapper fade-in">
      <table className="minimal-table">
        <thead>
          <tr>
            <th>ชื่อแผง / เจ้าของ</th>
            <th>สรุปผล</th>
            <th>จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {inspections.length === 0 ? (
            <tr>
              <td colSpan={3} style={{ textAlign: 'center', color: '#94a3b8', padding: '48px 24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3 }}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  <span>ยังไม่มีข้อมูลการประเมิน</span>
                </div>
              </td>
            </tr>
          ) : (
            inspections.map((ins, idx) => (
              <tr key={idx}>
                <td>
                  <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{ins.stall_name}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', marginTop: '2px' }}>
                    {ins.shop_owner} • {ins.marketName}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className={`status-dot ${ins.overall.toLowerCase()}`}></span>
                    <span style={{
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      color: ins.overall === 'PASS' ? 'var(--cta)' : 'var(--fail)'
                    }}>
                      {ins.overall === 'PASS' ? 'ผ่าน' : 'ไม่ผ่าน'}
                    </span>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button className="btn-edit" onClick={() => onEdit(idx)} title="แก้ไข">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      <span>แก้ไข</span>
                    </button>
                    <button className="btn-delete" onClick={() => onDelete(idx)} title="ลบ">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
