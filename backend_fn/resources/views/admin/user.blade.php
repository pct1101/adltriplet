@extends('admin/layout')
@section('content')
<div class="stats">
        <div class="container d-flex justify-content-end">
            <button class="btn btn-success my-3" data-bs-toggle="modal" data-bs-target="#addCarModal">Thêm <i
                    class="fa-solid fa-plus"></i></button>
        </div>
        <div class="row" style="justify-content: space-evenly;">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">User Name</th>
                        <th scope="col">User Image</th>
                        <th scope="col">Rental Price</th>
                        <th scope="col">License Plate</th>
                        <th scope="col">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($car as $data)
                        <tr>
                            <th scope="row">{{$data->car_id}}</th>
                            <td>{{$data->car_name}}</td>
                            <td><img src="/img/{{$data->car_image}}" style="width:50px;" alt=""></td>
                            <td>{{ number_format($data->rental_price, 0, ',', '.') }} VND</td>
                            <td>{{$data->license_plate}}</td>
                            <td class="d-flex">
                                <form action="{{ route('car.delete', $data->car_id) }}" method="POST"
                                    style="display:inline;" class="mx-2">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-danger"
                                        onclick="return confirm('Bạn có chắc chắn muốn xóa xe này không?');">
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                                </form>

                                <!-- Nút sửa xe -->
                                <form action="/editcaradmin/{{$data->car_id}}">
                                    <button class="btn btn-warning">
                                        <i class="fa-solid fa-wrench"></i>
                                    </button>
                                </form>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
            <div class="p-3" style="display:flex;justify-content: center;">{{$car->links()}}</div>
        </div>
    </div>
@endsection