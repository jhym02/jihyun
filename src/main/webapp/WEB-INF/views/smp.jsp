<%@ page import="java.io.BufferedReader, java.io.InputStreamReader, java.net.HttpURLConnection, java.net.URL, java.io.IOException" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>SMP Data Example</title>
    <style>
        .market-trend {
            font-family: Arial, sans-serif;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            max-width: 800px;
            margin: 0 auto;
        }
        .market-trend h2 {
            margin: 0;
            font-size: 24px;
            color: #333;
        }
        .separator {
            border-top: 1px solid #ddd;
            margin: 10px 0;
        }
        .market-trend table {
            width: 100%;
            border-collapse: collapse;
        }
        .market-trend table, .market-trend th, .market-trend td {
            border: 1px solid #ddd;
        }
        .market-trend th, .market-trend td {
            padding: 8px;
            text-align: left;
        }
        .market-trend th {
            background-color: #f4f4f4;
        }
    </style>
</head>
<body>
    <h1>SMP Data Example</h1>

    <%
        // API: SMP 데이터 API
        String serviceKey = "06cyzf6guv7ilUPsGDmEtXKdhoSZxQ0G1KTqwkJ+6vIs4gP18GLgpbIeXNVwsgTFKOMbbFdtyYWk1VYnoCtt7Q==";
        String apiUrl = "http://apis.data.go.kr/B552115/SmpDecByFuel";
        String pageNo = "1"; // 페이지번호
        String numOfRows = "1"; // 한 페이지 결과 수
        String dataType = "xml"; // 응답메시지 형식
        String tradeDay = "20240811"; // 거래일자

        String urlStr = apiUrl + "?serviceKey=" + serviceKey 
            + "&pageNo=" + pageNo 
            + "&numOfRows=" + numOfRows 
            + "&dataType=" + dataType 
            + "&tradeDay=" + tradeDay;

        StringBuilder responseBuilder = new StringBuilder();
        out.print("<p>Request URL: " + urlStr + "</p>"); // 요청 URL 출력

        try {
            URL url = new URL(urlStr);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            int responseCode = conn.getResponseCode();
            out.print("<p>Response Code: " + responseCode + "</p>"); // 응답 코드 출력

            if (responseCode == 200) {
                BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                String inputLine;

                while ((inputLine = in.readLine()) != null) {
                    responseBuilder.append(inputLine);
                }
                in.close();

                String xmlData = responseBuilder.toString();
                xmlData = xmlData.replace("\\", "\\\\").replace("'", "\\'").replace("\"", "\\\"").replace("\n", "\\n").replace("\r", "\\r");
                out.print("<script>var xmlData = \"" + xmlData + "\";</script>");
            } else {
                out.print("<p>Error: Unable to fetch data from SMP API. Response code: " + responseCode + "</p>");
            }
        } catch (IOException e) {
            out.print("<p>Error: " + e.getMessage() + "</p>");
        }
    %>

    <div id="marketTrend" class="market-trend">
        <h2>시장동향</h2>
        <h2>SMP</h2>
        <div class="separator"></div>
        <table id="smpTable">
            <thead>
                <tr>
                    <th>연료 유형</th>
                    <th>지역</th>
                    <th>카운트</th>
                    <th>순번</th>
                    <th>거래일자</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="5">로딩 중...</td>
                </tr>
            </tbody>
        </table>
    </div>

    <script>
        document.addEventListener("DOMContentLoaded", function() {
            if (typeof xmlData !== 'undefined') {
                try {
                    var parser = new DOMParser();
                    var xmlDoc = parser.parseFromString(xmlData, "text/xml");

                    // XML에서 데이터 추출
                    var items = xmlDoc.getElementsByTagName("item");
                    var tableBody = document.querySelector("#smpTable tbody");

                    // 테이블의 기존 로딩 중 텍스트를 제거
                    tableBody.innerHTML = "";

                    // 데이터가 있는 경우 테이블에 행 추가
                    Array.from(items).forEach(function(item) {
                        var row = document.createElement("tr");

                        var fuelType = item.getElementsByTagName("fuelType")[0].textContent;
                        var areaNm = item.getElementsByTagName("areaNm")[0].textContent;
                        var cnt = item.getElementsByTagName("cnt")[0].textContent;
                        var rn = item.getElementsByTagName("rn")[0].textContent;
                        var tradeDay = item.getElementsByTagName("tradeDay")[0].textContent;

                        var fuelTypeCell = document.createElement("td");
                        fuelTypeCell.textContent = fuelType;
                        row.appendChild(fuelTypeCell);

                        var areaNmCell = document.createElement("td");
                        areaNmCell.textContent = areaNm;
                        row.appendChild(areaNmCell);

                        var cntCell = document.createElement("td");
                        cntCell.textContent = cnt;
                        row.appendChild(cntCell);

                        var rnCell = document.createElement("td");
                        rnCell.textContent = rn;
                        row.appendChild(rnCell);

                        var tradeDayCell = document.createElement("td");
                        tradeDayCell.textContent = tradeDay;
                        row.appendChild(tradeDayCell);

                        tableBody.appendChild(row);
                    });
                } catch (e) {
                    document.querySelector("#smpTable tbody").innerHTML = "<tr><td colspan='5'>XML 파싱 오류</td></tr>";
                }
            } else {
                document.querySelector("#smpTable tbody").innerHTML = "<tr><td colspan='5'>API 데이터 로드 실패</td></tr>";
            }
        });
    </script>
</body>
</html>
