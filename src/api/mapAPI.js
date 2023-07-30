export async function getAddressFromLatLng(latitude, longitude) {
  try {
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`,
      {
        method: 'GET',
        headers: {
          Authorization: 'KakaoAK bb9458fc0ab4e3e0faaf85e82ed2c62b',
          KA: 'sdk/1.0.0 os/javascript origin/http://localhost:3000/',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const addressInfo = data.documents[0].address;
    const address = `${addressInfo.region_1depth_name} ${addressInfo.region_2depth_name} ${addressInfo.region_3depth_name}`;

    return address;
  } catch (error) {
    console.error('Error getting address from coordinates:', error);
    return null;
  }
}
