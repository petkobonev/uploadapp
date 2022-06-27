// import { useState } from "react";
// import { AppApolloClient, createApolloClient } from "reel-ux-lib";
// import { useDidMount, useFreshRef } from "rooks";
// import { GRAPHQL_API_URL } from "constants/app";
// import { useReactiveVar } from "@apollo/client";
// import { authState, setAccessToken } from "../auth";
//
// type Params = {
//   onShouldLogin: () => void;
// };
//
// export const useAppApolloClient = ({ onShouldLogin }: Params) => {
//   const [apolloClient, setApolloClient] = useState<AppApolloClient>();
//   const { accessToken } = useReactiveVar(authState);
//   const accessTokenFreshRef = useFreshRef(accessToken);
//
//   useDidMount(() => {
//     const instance = createApolloClient({
//       apiUrl: GRAPHQL_API_URL,
//       storage: {
//         getAccessToken: async () => accessTokenFreshRef.current || "",
//         setAccessToken: async (newAccessToken) => {
//           accessTokenFreshRef.current = newAccessToken;
//           setAccessToken(newAccessToken);
//         },
//       },
//       onShouldLogin,
//     });
//
//     setApolloClient(instance);
//   });
//
//   return apolloClient;
// };

export {}

