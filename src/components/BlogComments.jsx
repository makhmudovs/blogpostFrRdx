import PropTypes from "prop-types";

const BlogComment = ({ comments }) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              #
            </th>
            <th scope="col" className="px-6 py-3">
              Author
            </th>
            <th scope="col" className="px-6 py-3">
              Comment
            </th>
          </tr>
        </thead>
        <tbody>
          {comments &&
            comments.map((comment, i) => (
              <tr
                key={i}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {i + 1}
                </th>
                <td className="px-6 py-4">Anonymous</td>
                <td className="px-6 py-4">{comment}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

BlogComment.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default BlogComment;
