import request from "@/utils/request";

export async function queryFakeList(params) {
  return request("/api/fake2_list", {
    params
  });
}
export async function removeFakeList(params) {
  return request("/api/fake2_list", {
    method: "POST",
    data: { ...params, method: "delete" }
  });
}
export async function addFakeList(params) {
  return request("/api/fake2_list", {
    method: "POST",
    data: { params, method: "post" }
  });
}
export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request("/api/fake2_list", {
    method: "POST",
    params: {
      count
    },
    data: { ...restParams, method: "update" }
  });
}
