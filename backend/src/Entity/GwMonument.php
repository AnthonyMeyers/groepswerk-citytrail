<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\GwMonumentRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use function Symfony\Component\String\u;

/**
 * @ApiResource(
 *     shortName="Monument",
 *     normalizationContext={"groups"={"mon:read"}},
 *     denormalizationContext={"groups"={"mon:write"}}
 * )
 * @ORM\Entity(repositoryClass=GwMonumentRepository::class)
 */
class GwMonument
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"city:read","mon:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     * @Groups({"city:read","mon:read","mon:write"})
     */
    private $name;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"mon:read","mon:write"})
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"mon:read","mon:write"})
     */
    private $img;

    /**
     * @ORM\ManyToOne(targetEntity=GwCity::class, inversedBy="monuments")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"mon:read","mon:write"})
     */
    private $city;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = u($name)->trim()->lower()->title();

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getImg(): ?string
    {
        return $this->img;
    }

    public function setImg(?string $img): self
    {
        $this->img = $img;

        return $this;
    }

    public function getCity(): ?GwCity
    {
        return $this->city;
    }

    public function setCity(?GwCity $city): self
    {
        $this->city = $city;

        return $this;
    }
}
