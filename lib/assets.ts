export const assets=[
 {symbol:'SPY',name:'SPDR S&P 500 ETF Trust',type:'ETF หุ้นสหรัฐฯ',description:'ติดตามดัชนี S&P 500 เพื่อแสดงบริบทของหุ้นขนาดใหญ่ในสหรัฐฯ'},
 {symbol:'QQQ',name:'Invesco QQQ Trust',type:'ETF หุ้น Nasdaq-100',description:'ติดตามดัชนี Nasdaq-100 ซึ่งมีน้ำหนักหุ้นเทคโนโลยีสูง แต่ไม่ได้เป็นกองทุนเฉพาะเทคโนโลยี'},
 {symbol:'TLT',name:'iShares 20+ Year Treasury Bond ETF',type:'ETF พันธบัตรรัฐบาลสหรัฐฯ',description:'ลงทุนในพันธบัตรรัฐบาลสหรัฐฯ อายุคงเหลือมากกว่า 20 ปี ราคามีความไวต่อการเปลี่ยนแปลงอัตราดอกเบี้ย'},
 {symbol:'GLD',name:'SPDR Gold Shares',type:'กองทรัสต์ทองคำ',description:'ให้การลงทุนที่เชื่อมโยงกับราคาทองคำ หลังหักค่าใช้จ่ายของกองทรัสต์'},
 {symbol:'UUP',name:'Invesco DB US Dollar Index Bullish Fund',type:'กองทุนอ้างอิงดอลลาร์ผ่านฟิวเจอร์ส',description:'ลงทุนผ่านสัญญาฟิวเจอร์สที่อ้างอิงดอลลาร์เทียบตะกร้าสกุลเงิน ไม่ใช่การถือเงินดอลลาร์โดยตรง'},
 {symbol:'XLI',name:'Industrial Select Sector SPDR Fund',type:'ETF หุ้นกลุ่มอุตสาหกรรม',description:'ติดตามหุ้นกลุ่มอุตสาหกรรมใน S&P 500 ซึ่งเกี่ยวข้องกับต้นทุนการผลิตและการค้า'},
 {symbol:'XLY',name:'Consumer Discretionary Select Sector SPDR Fund',type:'ETF หุ้นบริโภคไม่จำเป็น',description:'ติดตามหุ้นกลุ่มสินค้าและบริการเพื่อการบริโภคที่ไม่จำเป็นใน S&P 500'}
];
const connections:Record<string,{symbols:string[];reason:string;context:string}>={
 CPI:{symbols:['SPY','QQQ','TLT','GLD','UUP'],reason:'เงินเฟ้อเป็นข้อมูลประกอบการประเมินดอกเบี้ย กำลังซื้อ และอัตราผลตอบแทนที่แท้จริง',context:'ข่าวเงินเฟ้อไม่ได้กำหนดทิศทางราคาทอง หุ้น พันธบัตร หรือดอลลาร์โดยลำพัง ต้องดูความต่างจากที่ตลาดคาดและข้อมูลอื่นประกอบ'},
 EMPLOYMENT:{symbols:['SPY','XLY','TLT','UUP'],reason:'การจ้างงานและอัตราว่างงานช่วยอ่านรายได้ครัวเรือน ความต้องการบริโภค และแนวโน้มเศรษฐกิจ',context:'การจ้างงานเพิ่มอาจส่งสัญญาณเศรษฐกิจแข็งแรง แต่ผลต่อดอกเบี้ยและราคาสินทรัพย์ขึ้นอยู่กับเงินเฟ้อและสิ่งที่ตลาดคาดไว้'},
 PPI:{symbols:['SPY','XLI','TLT'],reason:'ราคาฝั่งผู้ผลิตเกี่ยวข้องกับต้นทุนและความสามารถในการส่งผ่านราคาไปยังลูกค้า',context:'PPI ไม่ใช่กำไรของบริษัท และบริษัทแต่ละแห่งมีโครงสร้างต้นทุนต่างกัน จึงใช้บอกผลต่อหุ้นรายตัวโดยตรงไม่ได้'},
 JOLTS:{symbols:['SPY','XLY','TLT'],reason:'ตำแหน่งงานว่าง การรับคน และการลาออกช่วยอ่านความตึงตัวของตลาดแรงงาน',context:'ข้อมูล JOLTS ไม่ใช่ตัวเลขการจ้างงานสุทธิ ต้องอ่านคู่กับรายงานการจ้างงานและตรวจการปรับย้อนหลัง'},
 ECI:{symbols:['SPY','XLI','XLY','TLT'],reason:'ต้นทุนค่าจ้างและสวัสดิการเกี่ยวข้องกับค่าใช้จ่ายบริษัท รายได้ครัวเรือน และแรงกดดันเงินเฟ้อ',context:'ค่าจ้างเพิ่มมีผลทั้งด้านต้นทุนและกำลังซื้อ ผลสุทธิต่อบริษัทขึ้นอยู่กับรายได้ ผลิตภาพ และความสามารถในการตั้งราคา'},
 PRODUCTIVITY:{symbols:['SPY','XLI'],reason:'ผลิตภาพและต้นทุนแรงงานต่อหน่วยช่วยอ่านประสิทธิภาพการผลิตและแรงกดดันต้นทุน',context:'ข้อมูลครอบคลุมภาพเศรษฐกิจและอุตสาหกรรม ไม่ใช่ผลประกอบการของบริษัทหรือกองทุนที่ระบุ'},
 TRADE_PRICES:{symbols:['XLI','SPY','UUP'],reason:'ราคานำเข้าและส่งออกเกี่ยวข้องกับต้นทุนการค้าระหว่างประเทศและบริบทค่าเงิน',context:'ดัชนีราคาไม่ได้วัดปริมาณการค้า และความสัมพันธ์กับดอลลาร์ไม่ได้เป็นเหตุและผลทางเดียว'}
};
export function getConnection(topic:string){return connections[topic]}
export function getRelatedAssets(topic:string){return assets.filter(a=>connections[topic]?.symbols.includes(a.symbol))}
export function getAssetTopics(symbol:string){return Object.keys(connections).filter(t=>connections[t].symbols.includes(symbol))}
