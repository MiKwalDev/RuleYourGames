<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_')]
class ProfilController extends AbstractController
{
    #[Route('/profil', name: 'profil', methods: ['GET'])]
    public function index(): Response
    {
        return $this->json("Access granted");
    }
}
