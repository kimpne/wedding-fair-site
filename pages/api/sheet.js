import { getSheetData } from '../../lib/sheet';

export default async function handler(req, res) {
  try {
    const { region } = req.query; // 쿼리로 지역 받기
    const data = await getSheetData();

    // 지역별 필터링
    const filteredData = region
      ? data.filter((row) => row[0] === region)
      : data;

    res.status(200).json(filteredData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '데이터를 불러오지 못했습니다.' });
  }
}
