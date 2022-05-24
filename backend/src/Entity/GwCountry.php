<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\GwCountryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use function Symfony\Component\String\u;

/**
 * @ApiResource(
 *     shortName="Country",
 *     normalizationContext={"groups"={"country:read"}},
 *     denormalizationContext={"groups"={"country:write"}}
 * )
 * @ORM\Entity(repositoryClass=GwCountryRepository::class)
 */
class GwCountry
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"city:read","country:read","lang:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     * @Groups({"city:read","country:read","country:write","lang:read"})
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"country:read","country:write"})
     */
    private $flag;

    /**
     * @ORM\OneToMany(targetEntity=GwCity::class, mappedBy="country", orphanRemoval=true)
     * @Groups({"country:read"})
     */
    private $cities;

    /**
     * @ORM\ManyToMany(targetEntity=GwLanguage::class, inversedBy="countries")
     * @Groups({"country:read","country:write"})
     */
    private $languages;

    public function __construct()
    {
        $this->cities = new ArrayCollection();
        $this->languages = new ArrayCollection();
    }

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

    public function getFlag(): ?string
    {
        return $this->flag;
    }

    public function setFlag(?string $flag): self
    {
        $this->flag = $flag;

        return $this;
    }

    /**
     * @return Collection<int, GwCity>
     */
    public function getCities(): Collection
    {
        return $this->cities;
    }

    public function addCity(GwCity $city): self
    {
        if (!$this->cities->contains($city)) {
            $this->cities[] = $city;
            $city->setCountry($this);
        }

        return $this;
    }

    public function removeCity(GwCity $city): self
    {
        if ($this->cities->removeElement($city)) {
            // set the owning side to null (unless already changed)
            if ($city->getCountry() === $this) {
                $city->setCountry(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, GwLanguage>
     */
    public function getLanguages(): Collection
    {
        return $this->languages;
    }

    public function addLanguage(GwLanguage $language): self
    {
        if (!$this->languages->contains($language)) {
            $this->languages[] = $language;
        }

        return $this;
    }

    public function removeLanguage(GwLanguage $language): self
    {
        $this->languages->removeElement($language);

        return $this;
    }
}
