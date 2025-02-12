export async function fetchData(url, token, method = 'GET', body=null) {
    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      
      if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);
  
      if (!response.ok) {
        if(response.status === 409) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }
        throw new Error(`Failed to fetch data from ${url}`);
      }
      else if (response.status === 204) {
        return;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }