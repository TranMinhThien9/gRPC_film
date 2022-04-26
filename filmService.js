// chứa các hàm gọi tới lớp model để lấy dữ liệu và trả về file proto
module.exports.getFilmsList = async () => {
  try {
      const rows = await model.knexObj.select('*').from('film');
      return rows;
  } catch (error) {
      console.error(error);
  }
}