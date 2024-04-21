<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Joy's Café Search</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>
    <input type="text" id="searchBox" placeholder="Search for cafes...">
    <table id="cafeTable">
        <thead>
            <tr>
                <th>Name</th>
                <th>Street No</th>
                <th>Locality</th>
                <th>Postal Code</th>
                <th>Latitude</th>
                <th>Longitude</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>

    <script>
        // Function to fetch cafes and display them
        window.onload = function() {
            const sBox = document.getElementById('searchBox'); // Search box
            const cafeT = document.getElementById('cafeTable').getElementsByTagName('tbody')[0]; // Table to display cafes
    
            // search function to serach items
            function searchCafe(ca, sTerm) {
                return ca.name.toLowerCase().indexOf(sTerm.toLowerCase()) !== -1;
            }
    
            // Fetching cafes data
            fetch('https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/cafes.json')
                .then(function(r) { // Fetching cafes
                    return r.json(); // Returning response as JSON
                })
                .then(function(d1) { // Handling cafes data
                    const cafes = d1.cafes; // List of cafes
    
                    // Fetching places data
                    fetch('https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/places.json')
                        .then(function(r) { // Fetching places
                            return r.json(); // Returning response as JSON
                        })
                        .then(function(d2) { // Handling places data
                            const places = d2.places; // List of places
    
                            // Function to display cafes
                            function dispCafes(c) {
                                cafeT.innerHTML = ''; // Clearing previous data
                                c.forEach(function(ca) { // Iterating through cafes
                                    // Find place details for the cafe
                                    const place = places.find(function(p) {
                                        return p.id === ca.location_id;
                                    });
                                    if (place) {
                                        const r = document.createElement('tr'); // Creating table row
                                        r.innerHTML = `
                                            <td>${ca.name}</td>
                                            <td>${place.street_no}</td>
                                            <td>${place.locality}</td>
                                            <td>${place.postal_code}</td>
                                            <td>${place.lat}</td>
                                            <td>${place.long}</td>
                                        `; // Adding cafe details to row
                                        cafeT.appendChild(r); // Appending row to table
                                    }
                                });
                            }
    
                            dispCafes(cafes); // Display all cafes on page load
    
                            // Event listener for search box
                            sBox.addEventListener('input', function() {
                                const sTerm = sBox.value.toLowerCase(); // Search term
                                const fCafes = cafes.filter(function(ca) { // Filtering cafes
                                    return searchCafe(ca, sTerm); // Checking if cafe name includes search term
                                });
                                dispCafes(fCafes); // Display filtered cafes
                            });
                        });
                });
        };
    </script>
    

</body>
</html>