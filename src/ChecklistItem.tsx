import React from 'react';

interface ChecklistItemProps {
  title: string;
  isCritical: boolean;
  status: 'pass' | 'fail' | 'na';
  onChange: (status: 'pass' | 'fail' | 'na') => void;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({ title, isCritical, status, onChange }) => {
  return (
    <div className={`card checklist-item-card fade-in`}>
      <div className="item-header">
        <span className="item-title">{title}</span>
        {isCritical && <span className="critical-badge">สำคัญ</span>}
      </div>
      <div className="button-group">
        <button
          className={`btn-status pass ${status === 'pass' ? 'active' : ''}`}
          onClick={() => onChange('pass')}
        >
          ผ่าน
        </button>
        <button
          className={`btn-status fail ${status === 'fail' ? 'active' : ''}`}
          onClick={() => onChange('fail')}
        >
          ไม่ผ่าน
        </button>
        <button
          className={`btn-status na ${status === 'na' ? 'active' : ''}`}
          onClick={() => onChange('na')}
        >
          ไม่มี
        </button>
      </div>
    </div>
  );
};

export default ChecklistItem;
