export default function handler(request, response) {
    //console.log(request.query);
    // return response.end('here');
    // const { name } = request.query;
    return response.end(`Hello ${request.query.name}!`);
}