@extends('admin/layout')
@section('content')
<div class="topbar">
    <div class="toggle">
        <ion-icon name="menu-outline"></ion-icon>
    </div>
    <div class="search">
        <label>
            <input type="text" placeholder="Search here" />
            <ion-icon name="search-outline" class="mt-2"></ion-icon>
        </label>
    </div>
    <div class="user">
        <img src="user.jpg" />
    </div>
</div>
<div class="cardBox">
    <div class="card">
        <div>
            <div class="numbers">100</div>
            <div class="cardName">CAR</div>
        </div>
        <div class="iconBx">
            <ion-icon name="people-outline"></ion-icon>
        </div>
    </div>
    <div class="card">
        <div>
            <div class="numbers">80</div>
            <div class="cardName">USER</div>
        </div>
        <div class="iconBx">
            <ion-icon name="people-outline"></ion-icon>
        </div>
    </div>
    <div class="card">
        <div>
            <div class="numbers">284</div>
            <div class="cardName">Comments</div>
        </div>
        <div class="iconBx">
            <ion-icon name="chatbubbles-outline"></ion-icon>
        </div>
    </div>
    <div class="card">
        <div>
            <div class="numbers">$7,842</div>
            <div class="cardName">Earning</div>
        </div>
        <div class="iconBx">
            <ion-icon name="cash-outline"></ion-icon>
        </div>
    </div>
</div>
<div class="graphBox mt-3">
    <div class="box">
        <canvas id="myChart"></canvas>
    </div>
    <div class="box">
        <canvas id="earning"></canvas>
    </div>
</div>

<div class="details">
    <div class="recentOrders">
        <div class="cardHeader">
            <h2>CAR OF ALD TRIPLE T</h2>
            <a href="/admincar" class="btn">View All</a>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Car Name</th>
                    <th scope="col">Car Image</th>
                    <th scope="col">Rental Price</th>
                    <th scope="col">License Plate</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($car as $data)
                    <tr>
                        <td>{{$data->car_name}}</td>
                        <td><img src="/img/{{$data->car_image}}" style="width:50px;" alt=""></td>
                        <td>{{ number_format($data->rental_price, 0, ',', '.') }} VND</td>
                        <td>{{$data->license_plate}}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    <div class="recentCustomers">
        <div class="cardHeader">
            <h2>Users</h2>
        </div>
        <table>
            <tr>
                <td width="60px">
                    <div class="imgBx"><img src="img1.jpg" /></div>
                </td>
                <td>
                    <h4>Coding World<br /><span>Italy</span></h4>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="imgBx"><img src="img2.jpg" /></div>
                </td>
                <td>
                    <h4>Coding World<br /><span>India</span></h4>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="imgBx"><img src="img3.jpg" /></div>
                </td>
                <td>
                    <h4>Coding World<br /><span>France</span></h4>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="imgBx"><img src="img4.jpg" /></div>
                </td>
                <td>
                    <h4>Coding World<br /><span>USA</span></h4>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="imgBx"><img src="img5.jpg" /></div>
                </td>
                <td>
                    <h4>Coding World<br /><span>Japan</span></h4>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="imgBx"><img src="img6.jpg" /></div>
                </td>
                <td>
                    <h4>Coding World<br /><span>India</span></h4>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="imgBx"><img src="img7.jpg" /></div>
                </td>
                <td>
                    <h4>Coding World<br /><span>Malaysia</span></h4>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="imgBx"><img src="img8.jpg" /></div>
                </td>
                <td>
                    <h4>Coding World<br /><span>India</span></h4>
                </td>
            </tr>
        </table>
    </div>
</div>
@endsection