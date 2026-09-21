import { useState } from 'react';
import ChecklistItem from './ChecklistItem';
import ResultPanel from './ResultPanel';
import TableView from './TableView';
import './App.css';

const CHECKLIST_ITEMS = [
  { title: "1. แผงจำหน่ายอาหารสะอาด เป็นระเบียบ มีสภาพดี สูงจากพื้นไม่น้อยกว่า 60 ซม.", isCritical: true, advice: "ควรดูแลความสะอาดแผงและปรับปรุงสภาพให้ดีอยู่เสมอ พร้อมตรวจสอบความสูงจากพื้นให้ได้ตามเกณฑ์ 60 ซม." },
  { title: "2. ไม่เตรียมปรุงหรือวางอาหารกับพื้น", isCritical: false, advice: "ห้ามเตรียม ปรุง หรือวางอาหารบนพื้นโดยเด็ดขาด ต้องทำบนโต๊ะหรือแผงที่สะอาด" },
  { title: "3. อาหารสดมีการล้างก่อนนำไปปรุงอาหาร แยกเก็บเป็นสัดส่วน อาหารพร้อมบริโภคมีการปกปิด", isCritical: true, advice: "ควรล้างวัตถุดิบทุกครั้ง แยกประเภทการเก็บให้ชัดเจน และหาภาชนะปกปิดอาหารที่ปรุงเสร็จแล้ว" },
  { title: "4. สารปรุงแต่งอาหาร ต้องมีเลขทะเบียนตำรับ (อย.)", isCritical: false, advice: "เลือกใช้เครื่องปรุงรสและสารปรุงแต่งที่มีเครื่องหมาย อย. เท่านั้น" },
  { title: "5. น้ำดื่ม เครื่องดื่ม สะอาด ใส่ในภาชนะที่สะอาด มีการปกปิด มีก๊อกหรือทางเทรินน้ำ", isCritical: false, advice: "ภาชนะบรรจุเครื่องดื่มต้องสะอาด มีฝาปิด และมีก๊อกสำหรับจ่ายน้ำเพื่อสุขอนามัย" },
  { title: "6. น้ำแข็งสะอาด เก็บในภาชนะสะอาด มีที่ตักด้ามยาว ไม่แช่อาหารอื่นรวม", isCritical: false, advice: "แยกถังน้ำแข็งสำหรับบริโภค ใช้ที่ตักด้ามยาว และห้ามนำสิ่งของอื่นลงไปแช่ในถังน้ำแข็ง" },
  { title: "7. ล้างภาชนะด้วยน้ำยาล้างภาชนะ แล้วล้างด้วยน้ำสะอาดอย่างน้อย 2 ครั้ง", isCritical: false, advice: "ควรล้างภาชนะให้สะอาดตามขั้นตอน โดยล้างน้ำสะอาดอย่างน้อย 2 รอบเพื่อให้หมดคราบน้ำยา" },
  { title: "8. ช้อนส้อมตะเกียบวางเอาด้ามขึ้น/เป็นระเบียบ", isCritical: false, advice: "ควรจัดเก็บช้อนส้อมและตะเกียบโดยหันด้ามขึ้น เพื่อป้องกันการปนเปื้อนบริเวณที่ใช้ตักอาหาร" },
  { title: "9. เขียงมีสภาพดี มีการแยกเขียงเนื้อสด เนื้อสุก ผักสด และมีฝาชิดปิด", isCritical: true, advice: "ควรใช้เขียงที่ไม่มีรอยแตกพุ และแยกประเภทเขียงตามการใช้งานเพื่อป้องกันเชื้อโรคปนเปื้อน" },
  { title: "10. มีการรวบรวมขยะเพื่อนำไปกำจัด", isCritical: false, advice: "ควรมีถังขยะที่มีฝาปิดมิดชิดและนำขยะไปทิ้งในจุดที่กำหนดสม่ำเสมอ" },
  { title: "11. ผู้สัมผัสอาหารใส่เสื้อมีแขนใส่ผ้ากันเปื้อนและหมวกคลุมผม", isCritical: true, advice: "ผู้ประกอบอาหารและผู้ช่วยต้องแต่งกายให้ถูกสุขลักษณะ สวมผ้ากันเปื้อนและหมวกคลุมผมให้เรียบร้อย" },
  { title: "12. ใช้อุปกรณ์หยิบอาหาร ใช้ถุงมือหยิบเฉพาะอาหาร", isCritical: false, advice: "ควรใช้อุปกรณ์หยิบจับอาหารหรือสวมถุงมือสะอาดทุกครั้งที่สัมผัสอาหารพร้อมบริโภค" },
  { title: "13. ผู้ปรุง หรือผู้เสิร์ฟอาหารที่มีบาดแผลที่มือให้ทำการปิดแผลให้มิดชิด", isCritical: false, advice: "หากมีบาดแผลต้องทำความสะอาดและปิดพลาสเตอร์กันน้ำให้มิดชิดก่อนปฏิบัติงาน" },
  { title: "14. มีการใช้ถังดักไขมันบำบัดน้ำเบื้องต้นเพื่อกรองเศษอาหาร", isCritical: true, advice: "ควรติดตั้งและหมั่นทำความสะอาดถังดักไขมันเพื่อไม่ให้มีเศษอาหารอุดตันหรือส่งกลิ่น" },
  { title: "15. ไม่ใช้ภาชนะโฟมบรรจุอาหาร", isCritical: false, advice: "ห้ามใช้กล่องโฟมบรรจุอาหาร ให้เปลี่ยนไปใช้ภาชนะที่เป็นมิตรต่อสิ่งแวดล้อมหรือถุงร้อนที่ปลอดภัย" },
];

const MARKET_DATA: Record<string, string[]> = {
  "ตลาดประเภท 1": [
    "ตลาด 1",
    "ตลาด 2",
    "ตลาดหนองไผ่ล้อม",
    "ตลาดบางลำภู",
    "ตลาด อ.จิระ",
    "ตลาดรถไฟ",
    "ตลาดศรีเมืองทอง",
    "ตลาด 3 (ปิดพื้นที่)"
  ],
  "ตลาดประเภทที่ 2": [
    "จอมพล",
    "ต้นตาล",
    "กังไนท์",
    "เปิดท้าย มข",
    "ตลาดเขียว",
    "ถนนคนเดิน"
  ],
  "ศูนย์อาหาร": [
    "โต้รุ่งร่วมจิตร",
    "ตองแปด",
    "มอดินแดง",
    "62 บล็อก"
  ],
  "ตลาดชุมชนอื่นๆ ที่มีการตรวจสุขาภิบาลอาหาร": [
    "ตลาดติดน้ำ",
    "ตลาดหน้าวัดมรรคสำราญ",
    "ตลาดสามเหลี่ยมเช้า-เย็น",
    "หน้าตลาดจอมพลเช้า"
  ]
};

type Inspection = {
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
};

type ExcelCell = string | number | boolean | null;
type ExcelRow = ExcelCell[];
type ExcelMerge = {
  s: { r: number; c: number };
  e: { r: number; c: number };
};

function App() {
  const [formData, setFormData] = useState({
    shop_owner: "",
    food_type: "",
    stall_name: "",
    phone: "",
    marketType: "",
    marketName: "",
    customAdvice: ""
  });

  const [lockMarket, setLockMarket] = useState(false);
  const [results, setResults] = useState<Record<string, 'pass' | 'fail' | 'na'>>({});
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const passCount = Object.values(results).filter(v => v === 'pass').length;
  const criticalFailed = CHECKLIST_ITEMS.some(item => item.isCritical && results[item.title] === 'fail');
  const overall: 'PASS' | 'FAIL' = criticalFailed ? 'FAIL' : 'PASS';

  const handleStatusChange = (title: string, status: 'pass' | 'fail' | 'na') => {
    setResults(prev => ({ ...prev, [title]: status }));
  };

  const handleEdit = (index: number) => {
    const target = inspections[index];
    setFormData({
      shop_owner: target.shop_owner,
      food_type: target.food_type,
      stall_name: target.stall_name,
      phone: target.phone,
      marketType: target.marketType,
      marketName: target.marketName,
      customAdvice: target.customAdvice || ""
    });
    setResults(target.results);
    setEditIndex(index);
    setLockMarket(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (index: number) => {
    if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?")) {
      const updated = inspections.filter((_, i) => i !== index);
      setInspections(updated);
      if (editIndex === index) {
        setEditIndex(null);
        setFormData({ ...formData, shop_owner: "", food_type: "", stall_name: "", phone: "", customAdvice: "" });
        setResults({});
      }
    }
  };

  const handleSave = () => {
    if (!formData.shop_owner || !formData.stall_name || !formData.marketName) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน (รวมถึงสถานที่)");
      return;
    }

    const advice = CHECKLIST_ITEMS
      .filter(item => results[item.title] === 'fail')
      .map(item => item.advice);

    if (formData.customAdvice.trim()) {
      advice.push(formData.customAdvice.trim());
    }

    const newInspection = {
      ...formData,
      results: { ...results },
      overall,
      advice: Array.from(new Set(advice))
    };

    if (editIndex !== null) {
      const updated = [...inspections];
      updated[editIndex] = newInspection;
      setInspections(updated);
      setEditIndex(null);
    } else {
      setInspections(prev => [...prev, newInspection]);
    }

    // If market is NOT locked, clear it. Otherwise keep it for next stall.
    setFormData(prev => ({
      ...prev,
      shop_owner: "",
      food_type: "",
      stall_name: "",
      phone: "",
      customAdvice: "",
      marketType: lockMarket ? prev.marketType : "",
      marketName: lockMarket ? prev.marketName : ""
    }));
    setResults({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const exportToExcel = async () => {
    try {
      // @ts-expect-error SheetJS is loaded from a remote ES module at runtime.
      const XLSX = await import('https://cdn.sheetjs.com/xlsx-0.20.1/package/xlsx.mjs');
      const workbook = XLSX.utils.book_new();

      // Group inspections by marketName
      const markets = Array.from(new Set(inspections.map(i => i.marketName)));

      markets.forEach(marketName => {
        const marketInspections = inspections.filter(i => i.marketName === marketName);
        const aoa: ExcelRow[] = [];
        const merges: ExcelMerge[] = [];
        const dateStr = new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });

        // Header specific to this market
        aoa.push([`ผลการตรวจประเมิน: ${marketName}`]);
        merges.push({ s: { r: 0, c: 0 }, e: { r: 0, c: 2 } });
        aoa.push([`ประเภท: ${marketInspections[0].marketType} | วันที่: ${dateStr}`]);
        merges.push({ s: { r: 1, c: 0 }, e: { r: 1, c: 2 } });
        aoa.push([]);

        marketInspections.forEach((ins, idx) => {
          const startRow = aoa.length;
          aoa.push([`รายการที่ ${idx + 1}`]);
          merges.push({ s: { r: startRow, c: 0 }, e: { r: startRow, c: 2 } });
          aoa.push(["ชื่อแผง:", ins.stall_name, "เจ้าของ:", ins.shop_owner]);
          aoa.push(["ประเภทอาหาร:", ins.food_type, "เบอร์โทร:", ins.phone]);
          aoa.push([]);
          aoa.push(["ลำดับ", "หัวข้อการตรวจสอบ", "ผลการตรวจ"]);
          CHECKLIST_ITEMS.forEach((item, i) => {
            const status = ins.results[item.title] || 'na';
            const statusText = status === 'pass' ? 'ผ่าน' : (status === 'fail' ? 'ไม่ผ่าน' : 'ไม่มี');
            aoa.push([i + 1, item.title.replace(/^\d+\.\s*/, ''), statusText]);
          });
          aoa.push(["", "สรุปผลการตรวจสอบ:", ins.overall === 'PASS' ? "ผ่านเกณฑ์" : "ไม่ผ่านเกณฑ์"]);
          aoa.push([]);

          const adviceHeaderRow = aoa.length;
          aoa.push(["คำแนะนำ"]);
          merges.push({ s: { r: adviceHeaderRow, c: 0 }, e: { r: adviceHeaderRow, c: 2 } });
          if (ins.advice.length > 0) {
            ins.advice.forEach((adv: string, i: number) => {
              aoa.push(["", `${i + 1}. ${adv}`]);
              merges.push({ s: { r: aoa.length - 1, c: 1 }, e: { r: aoa.length - 1, c: 2 } });
            });
          } else {
            aoa.push(["", "- ไม่มีข้อบกพร่อง -"]);
            merges.push({ s: { r: aoa.length - 1, c: 1 }, e: { r: aoa.length - 1, c: 2 } });
          }
          aoa.push([]);
          aoa.push(["----------------------------------------------------------"]);
          aoa.push([]);
        });

        // Market Summary Section
        const marketTotal = marketInspections.length;
        const marketPassed = marketInspections.filter(i => i.overall === 'PASS').length;
        const marketFailed = marketInspections.filter(i => i.overall === 'FAIL').length;

        aoa.push([`สรุปผลการตรวจ: ${marketName}`]);
        merges.push({ s: { r: aoa.length - 1, c: 0 }, e: { r: aoa.length - 1, c: 2 } });

        aoa.push([`ผลการตรวจแผงจำหน่ายอาหาร จำนวนทั้งหมด ${marketTotal} ร้าน | ผ่าน ${marketPassed} ร้าน | ไม่ผ่าน ${marketFailed} ร้าน`]);
        merges.push({ s: { r: aoa.length - 1, c: 0 }, e: { r: aoa.length - 1, c: 2 } });
        aoa.push([]);

        // Top 5 failed items for this market
        const marketFailedCounts: Record<string, number> = {};
        marketInspections.forEach(ins => {
          Object.entries(ins.results).forEach(([title, status]) => {
            if (status === 'fail') {
              marketFailedCounts[title] = (marketFailedCounts[title] || 0) + 1;
            }
          });
        });
        const marketTopFailed = Object.entries(marketFailedCounts)
          .sort(([,a],[,b]) => b - a)
          .slice(0, 5);

        if (marketTopFailed.length > 0) {
          aoa.push([`5 อันดับหัวข้อที่ไม่ผ่านบ่อยที่สุด (${marketName})`]);
          merges.push({ s: { r: aoa.length - 1, c: 0 }, e: { r: aoa.length - 1, c: 2 } });
          marketTopFailed.forEach(([title, count], idx) => {
            aoa.push([`${idx + 1}.`, title.replace(/^\d+\.\s*/, ''), `${count} ครั้ง`]);
          });
          aoa.push([]);
        }

        const worksheet = XLSX.utils.aoa_to_sheet(aoa);
        worksheet['!merges'] = merges;
        worksheet['!cols'] = [{ wch: 10 }, { wch: 60 }, { wch: 20 }];

        // Clean sheet name (max 31 chars, no invalid chars)
        const sheetName = marketName.substring(0, 31);
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      });

      XLSX.writeFile(workbook, "รายงานการตรวจประเมินรายสถานที่.xlsx");
    } catch (err) {
      console.error(err);
      alert("Error exporting Excel");
    }
  };


  return (
    <div className="app-container">
      <header className="header">
        <h1>ระบบตรวจประเมินแผงลอย</h1>
        <p className="header-subtitle">ตรวจสอบมาตรฐานสุขาภิบาลอาหาร เพื่อความปลอดภัยของผู้บริโภค</p>
      </header>

      <div className="main-layout">
        <div className="content-area">
          <section className="card form-section fade-in">
            {/* Market Selection */}
            <div className="input-field">
              <label>ประเภทตลาด</label>
              <select
                value={formData.marketType}
                onChange={e => setFormData({...formData, marketType: e.target.value, marketName: ""})}
                className="custom-select"
              >
                <option value="">-- เลือกประเภทตลาด --</option>
                {Object.keys(MARKET_DATA).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="input-field">
              <label>ชื่อสถานที่ / ตลาด</label>
              <select
                value={formData.marketName}
                onChange={e => setFormData({...formData, marketName: e.target.value})}
                disabled={!formData.marketType}
                className="custom-select"
              >
                <option value="">-- เลือกสถานที่ --</option>
                {formData.marketType && MARKET_DATA[formData.marketType].map(name => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>

            <div className="input-field" style={{ gridColumn: 'span 2' }}>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={lockMarket}
                  onChange={e => setLockMarket(e.target.checked)}
                />
                <span>ตรึงสถานที่นี้ไว้ (สำหรับตรวจแผงลอยร้านถัดไปในตลาดเดียวกัน)</span>
              </label>
            </div>

            <hr style={{ gridColumn: 'span 2', border: '0', borderTop: '1px solid var(--border)', margin: '10px 0' }} />

            <div className="input-field">
              <label>ชื่อ-นามสกุล เจ้าของ</label>
              <input value={formData.shop_owner} onChange={e => setFormData({...formData, shop_owner: e.target.value})} placeholder="ระบุชื่อเจ้าของ" />
            </div>
            <div className="input-field">
              <label>ชื่อแผง / ร้าน</label>
              <input value={formData.stall_name} onChange={e => setFormData({...formData, stall_name: e.target.value})} placeholder="ระบุชื่อแผง" />
            </div>
            <div className="input-field">
              <label>ประเภทอาหาร</label>
              <input value={formData.food_type} onChange={e => setFormData({...formData, food_type: e.target.value})} placeholder="เช่น อาหารตามสั่ง, ขนม" />
            </div>
            <div className="input-field">
              <label>เบอร์โทรศัพท์</label>
              <input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="ระบุเบอร์โทร" />
            </div>
            <div className="input-field" style={{ gridColumn: 'span 2' }}>
              <label>คำแนะนำเพิ่มเติม (ระบุเอง)</label>
              <textarea
                value={formData.customAdvice}
                onChange={e => setFormData({...formData, customAdvice: e.target.value})}
                placeholder="ระบุคำแนะนำเพิ่มเติมที่นี่..."
                rows={3}
              />
            </div>
          </section>

          <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 600 }}>
              <span>ความคืบหน้าการตรวจสอบ</span>
              <span>{Math.round((Object.keys(results).length / 15) * 100)}%</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: '#E2E8F0', borderRadius: '99px', overflow: 'hidden' }}>
              <div style={{
                width: `${(Object.keys(results).length / 15) * 100}%`,
                height: '100%',
                background: 'var(--primary)',
                transition: 'width 0.3s ease-out'
              }}></div>
            </div>
          </div>

          <section className="checklist-section">
            {CHECKLIST_ITEMS.map((item, index) => (
              <ChecklistItem
                key={index}
                title={item.title}
                isCritical={item.isCritical}
                status={results[item.title] || 'na'}
                onChange={(status) => handleStatusChange(item.title, status)}
              />
            ))}
          </section>
        </div>

        <section className="side-panel">
          <ResultPanel
            overall={overall}
            passCount={passCount}
            criticalFailed={criticalFailed}
          />

          {inspections.length > 0 && (
            <div className="card advice-card fade-in">
              <h4>คำแนะนำ (ล่าสุด):</h4>
              <ul className="advice-list">
                {inspections[inspections.length - 1].advice.length > 0 ? (
                  inspections[inspections.length - 1].advice.map((a: string, i: number) => <li key={i}>{a}</li>)
                ) : (
                  <li>ผ่านเกณฑ์มาตรฐานครบถ้วน</li>
                )}
              </ul>
            </div>
          )}

          <div className="main-actions">
            <button className="btn-primary" onClick={handleSave}>
              {editIndex !== null ? 'อัปเดตข้อมูล' : 'บันทึกผลการประเมิน'}
            </button>
            <button className="btn-outline" onClick={exportToExcel} disabled={inspections.length === 0}>
              ดาวน์โหลดรายงาน Excel
            </button>
          </div>
        </section>
      </div>


      <section className="history-section">
        <h2>ประวัติการประเมิน</h2>
        <TableView
          inspections={inspections}
          checklistTitles={CHECKLIST_ITEMS.map(i => i.title)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </section>
    </div>
  );
}

export default App;
