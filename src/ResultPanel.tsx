import React from 'react';

interface ResultPanelProps {
  overall: 'PASS' | 'FAIL';
  passCount: number;
  criticalFailed: boolean;
}

const ResultPanel: React.FC<ResultPanelProps> = ({ overall, passCount, criticalFailed }) => {
  return (
    <div className={`card result-card fade-in`}>
      <span className="result-info">สรุปผลการประเมิน</span>
      <div className={`status-badge ${overall.toLowerCase()}`}>
        {overall === 'PASS' ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '12px' }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <span>ผ่านเกณฑ์</span>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '12px' }}><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
            <span>ไม่ผ่าน</span>
          </div>
        )}
      </div>
      <div className="result-info" style={{ fontSize: '1rem', color: 'var(--text-main)' }}>
        ผ่านทั้งหมด <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{passCount}</span> / 15 รายการ
      </div>
      {criticalFailed && (
        <div className="warning-box">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '4px' }}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          <div>ไม่ผ่าน: พบข้อบกพร่องในหัวข้อสำคัญ (Critical)</div>
        </div>
      )}
    </div>
  );
};

export default ResultPanel;
