
export default class Graph {
  private client: any;

  constructor(wovenClient: any) {
    this.client = wovenClient;
  }
  
  query(graphQuery: any) {
    /*
    Sends POST request to the GraphQl endpoint with given query as body.
    Allow bot string literal and primitive string argument
    Eg:
      wovenpay.query`{ allCustomers {edge{node{ id }}} }`      
      wovenpay.query("{ allCustomers {edge{node{ id }}} }")

    @param graphQuery - GraphQl query
    */
    let gQuery: string = graphQuery.raw? graphQuery[0] : graphQuery;
    return this.client.request({
      url: `/graphql/`,
      method: 'POST',
      body: JSON.stringify({query:gQuery})
    })
  }
}


