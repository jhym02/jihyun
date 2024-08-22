<%@ page import="java.io.BufferedReader, java.io.InputStreamReader, java.net.HttpURLConnection, java.net.URL, java.io.IOException" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>API Data Example</title>
    <style>
        .market-trend {
            font-family: Arial, sans-serif;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            max-width: 600px;
            margin: 0 auto;
        }
        .market-trend h2 {
            margin: 0;
            font-size: 24px;
            color: #333;
        }
        .market-trend .main-value {
            font-size: 36px;
            font-weight: bold;
            margin: 10px 0;
        }
        .separator {
            border-top: 1px solid #ddd;
            margin: 10px 0;
        }
        .market-trend .sub-title {
            font-size: 18px;
            color: #666;
        }
        .market-trend .sub-text {
            font-size: 14px;
            color: #999;
        }
        .market-trend .value {
            font-size: 20px;
            color: #333;
        }
    </style>
</head>
<body>
    <h1>API Data Example</h1>

    <%
        // API: TradeList API
        String serviceKey1 = "06cyzf6guv7ilUPsGDmEtXKdhoSZxQ0G1KTqwkJ%2B6vIs4gP18GLgpbIeXNVwsgTFKOMbbFdtyYWk1VYnoCtt7Q%3D%3D";
        String apiUrl1 = "http://www.iwest.co.kr:8082/openapi-data/service/TradeList/Trade";
        String strDateE = "201802";
        String strDateS = "201701";
        String urlStr1 = apiUrl1 + "?serviceKey=" + serviceKey1 + "&strDateE=" + strDateE + "&strDateS=" + strDateS;

        StringBuilder responseBuilder1 = new StringBuilder();

        try {
            URL url1 = new URL(urlStr1);
            HttpURLConnection conn1 = (HttpURLConnection) url1.openConnection();
            conn1.setRequestMethod("GET");

            int responseCode1 = conn1.getResponseCode();
            if (responseCode1 == 200) {
                BufferedReader in1 = new BufferedReader(new InputStreamReader(conn1.getInputStream()));
                String inputLine;

                while ((inputLine = in1.readLine()) != null) {
                    responseBuilder1.append(inputLine);
                }
                in1.close();

                String xmlData1 = responseBuilder1.toString();
                xmlData1 = xmlData1.replace("\\", "\\\\").replace("'", "\\'").replace("\"", "\\\"").replace("\n", "\\n").replace("\r", "\\r");
                out.print("<script>var xmlData1 = \"" + xmlData1 + "\";</script>");
            } else {
                out.print("<p>Error: Unable to fetch data from TradeList API. Response code: " + responseCode1 + "</p>");
            }
        } catch (IOException e) {
            out.print("<p>Error: " + e.getMessage() + "</p>");
        }
    %>

    <div id="marketTrend" class="market-trend">
        <h2>시장동향</h2>
        <h2>SMP + (REC × 1.0)</h2>
        <div class="main-value" id="mainValue">226.72</div>
        <div class="separator"></div>
        <div class="sub-title">REC 현물</div>
        <div class="value" id="recValue">78,100</div> <!-- REC 값을 표시할 위치 -->
    </div>
    <div class="content">
		<!-- SweetAlert 메시지 -->
		<script>
            Swal.fire({
                title: "농작물 재배 알림",
                text: "감자, 고구마, 참깨, 팥의 모종을 심을 시기입니다!",
                icon: "info",
                confirmButtonColor: "#6DD66D", // 확인 버튼 색상 설정
                confirmButtonText: "확인"
            });
        </script>
	</div>

    <script>
        document.addEventListener("DOMContentLoaded", function() {
            if (typeof xmlData1 !== 'undefined') {
                var parser1 = new DOMParser();
                var xmlDoc1 = parser1.parseFromString(xmlData1, "text/xml");

                // TradeList API에서 관련 데이터를 추출합니다.
                var items1 = xmlDoc1.getElementsByTagName("item");
                if (items1.length > 0) {
                    var recprice = items1[0].getElementsByTagName("recprice")[0].textContent;

                    // 추출한 데이터로 HTML 업데이트
                    document.getElementById("recValue").textContent = recprice; // REC 값이 이곳에 표시됩니다.
                }
            }
        });
    </script>
</body>
</html>
